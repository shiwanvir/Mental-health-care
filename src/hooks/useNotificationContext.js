import React, { createContext, useContext, useState, useEffect } from "react";
import { View, Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationModal from "../screens/GoalSetting/GoalNotificationModal"; // Import the NotificationModal component
export const NotificationContext = createContext({});

export const NotificationProvider = ({ children }) => {
  const [notificationIdentifire, setNotificationIdentifire] = useState(null);
  const [mySheduler, setMyShedular] = useState(null);
  const [notificationData, setNotificationData] = useState([]);
  // State to control the visibility of the NotificationModal
  const [modalVisible, setModalVisible] = useState(false);

  // State to hold the notification data for the modal
  const [modalNotificationData, setModalNotificationData] = useState({});
  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener(handleNotification);
    loadNotification();
    // Add a notification response listener to handle user interaction with notifications
    const subscription = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
    return () => subscription.remove();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //console.log("inside permisssion.....")
    if (status !== "granted") {
      console.log("Notification permissions denied!");
      return;
    }
    // Save the device's push notification token for later use
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Notification token---------->:", token);
  };

  // const scheduleNotification = async (
  //   activityKey,
  //   title,
  //   body,
  //   callAfterIn
  // ) => {
  //   saveNotification(activityKey, title, body, callAfterIn);
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: title,
  //       body: body,
  //     },
  //     trigger: {
  //       seconds: callAfterIn, // Delay in seconds before showing the notification
  //     },
  //   });
  // };
  const scheduleNotification = async (
    activityKey,
    title,
    body,
    callAfterIn
  ) => {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: {
          activityKey: activityKey, // Include any other data you need to pass
        },
      },
      trigger: {
        seconds: callAfterIn, // Delay in seconds before showing the notification
      },
    });
    // Save the notification identifier for later use
    setNotificationIdentifire(identifier);
    saveNotification(activityKey, title, body, callAfterIn, identifier);
  };

  // function handleNotification(notification) {
  //   console.log(notification.request.identifier);
  //   console.log(notificationIdentifire);
  //   console.log(notification.request.identifier != notificationIdentifire);

  //   if (notification.request.identifier != notificationIdentifire) {
  //     console.log("Received notification____>:", notification);
  //     Notifications.setNotificationHandler({
  //       handleNotification: async () => ({
  //         shouldShowAlert: true,
  //         shouldPlaySound: true,
  //         shouldSetBadge: true,
  //       }),
  //     });

  //     Notifications.presentNotificationAsync({
  //       title: notification.request.content.title,
  //       body: notification.request.content.body,
  //       data: notification.request.content.data,
  //     });
  //     // Trigger the handleUserResponse function with the notification identifier
  //     handleUserResponse(notification.request.identifier);

  //     console.log("Before set");
  //     console.log(notification.request.identifier);
  //     setNotificationIdentifire(notification.request.identifier);
  //   } else {
  //     console.log("I'm here in else");
  //   }
  // }
  function handleNotification(notification) {
    console.log(notification.request.identifier);
    console.log(notificationIdentifire);
    console.log(notification.request.identifier !== notificationIdentifire);

    if (notification.request.identifier !== notificationIdentifire) {
      console.log("Received notification____>:", notification);

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      // Handle the notification content here based on your needs
      // In this example, we log the notification data
      console.log(notification.request.content);

      // Trigger the handleUserResponse function with the notification identifier
      //handleUserResponse(notification.request.identifier);

      console.log("Before set");
      console.log(notification.request.identifier);
      setNotificationIdentifire(notification.request.identifier);
    } else {
      console.log("I'm here in else");
    }
  }

  const saveNotification = async (activityKey, title, body, callAfterIn) => {
    const newNotification = {
      id: new Date().getTime(),
      activityKey: activityKey,
      title: title,
      body: body,
      callAfterIn: callAfterIn,
      currentDate: formatDate(new Date()),
    };
    const updatedData = [...notificationData, newNotification];
    await AsyncStorage.setItem("notification_data", JSON.stringify(updatedData))
      .then(() => {
        setNotificationData(updatedData);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}:${month}:${day}:${hours}:${minutes}`;
  };

  const deleteNotification = async (notificationId) => {
    try {
      let updatedData = notificationData.filter(
        (item) => item.id != notificationId
      );
      await AsyncStorage.setItem(
        "notification_data",
        JSON.stringify(updatedData)
      );
      setNotificationData(updatedData);
    } catch (error) {
      console.log("Error in notification deleting..", error);
    }
  };

  const loadNotification = async () => {
    try {
      const allNotifications = await AsyncStorage.getItem("notification_data");
      console.log(allNotifications);
      if (allNotifications != null) {
        setNotificationData(JSON.parse(allNotifications));
      }
    } catch (error) {}
  };

  const clearNotificationList = async () => {
    try {
      updatedData = [];
      const allNotifications = await AsyncStorage.setItem(
        "notification_data",
        JSON.stringify(updatedData)
      );
      setNotificationData(updatedData);
    } catch (error) {
      console.log("delete all Error", error);
    }
  };
  // Handle notification click (user response)
  const handleNotificationResponse = (response) => {
    console.log("User responded to notification:", response);
    // Here, you can open a modal or perform any specific action based on the notification content
    if (response.notification && response.notification.request.content) {
      console.log("Inside If");
      const notificationData = response.notification.request.content;
      if (notificationData) {
        console.log("Data:", notificationData);
        if (notificationData.activityKey == "GS") {
          setModalNotificationData(notificationData);
          setModalVisible(true);
        }
      }
    } else {
      console.log("inside else");
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        registerForPushNotificationsAsync,
        scheduleNotification,
        notificationIdentifire,
        loadNotification,
        notificationData,
        deleteNotification,
        clearNotificationList,
        handleNotificationResponse,
      }}
    >
      {children}
      {/* Render the NotificationModal with the necessary props */}
      <NotificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        notificationData={modalNotificationData}
      />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
