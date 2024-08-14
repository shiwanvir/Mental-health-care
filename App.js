import React, { useCallback, useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Tabs from "./navigation/tabs";
import GoalSettingScreen from "./src/screens/GoalSetting/GoalSettingScreen";
import store from "./redux/store";
import { setGoals } from "./redux/actions";
import { CommonProvider } from "./src/hooks/useGlobalContext";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./styles/themeContext";
import darkMode from "./styles/darkMode";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import LocalNotification from "./src/components/Notifications/LocalNotification";
import NotificationModal from "./src/screens/GoalSetting/GoalNotificationModal";
import {
  NotificationProvider,
  NotificationContext,
} from "./src/hooks/useNotificationContext";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showGoalSetting, setShowGoalSetting] = useState(true);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [userGoals, setUserGoals] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [receivedEndOfDayNotification, setReceivedEndOfDayNotification] =
    useState(false);
  const [userInteractedWithNotification, setUserInteractedWithNotification] =
    useState(false);

  // const [theme, setTheme] = useState(false);

  // useEffect(() => {
  //   const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
  //     setTheme(data);
  //     console.log(data);
  //   });
  //
  //   return () => {
  //     EventRegister.removeAllListeners(listener);
  //   };
  // }, [theme]);

  // useEffect(() => {
  //   // Register notification handler
  //   const notificationListener =
  //     Notifications.addNotificationResponseReceivedListener(handleNotification);

  //   return () => {
  //     // Clean up notification listener when the component unmounts
  //     notificationListener.remove();
  //   };
  // }, []);

  // const handleNotification = (notification) => {
  //   console.log("Received notification:", notification);
  //   // Set the state to indicate that the user has interacted with the notification
  //   //setNotificationData(notification.request.content.data);
  //   // Handle the notification here, open a modal or a separate screen to handle the user's response.
  //   // if (
  //   //   notification.request.trigger &&
  //   //   notification.request.trigger === "selected"
  //   // ) {
  //   try {
  //     // Check if the notification is from Expo notifications
  //     if (
  //       notification &&
  //       notification.request &&
  //       notification.request.content
  //     ) {
  //       console.log("Received Expo notification:", notification);
  //       const notificationContent = notification.request.content;

  //       // // Check if it is the end-of-day notification
  //       // if (notificationContent.title === "Daily Goals") {
  //       //   setReceivedEndOfDayNotification(true);
  //       // }
  //       // setUserInteractedWithNotification(true);
  //       // console.log("demo:", setUserInteractedWithNotification);
  //       // // Open the notification modal
  //       // setShowNotificationModal(true);
  //       //}
  //     } else {
  //       // Handle non-Expo notifications here (if needed)
  //       console.log("Received non-Expo notification:", notification);
  //       const notificationContent = notification.request.content;
  //       // Check if it is the end-of-day notification
  //       if (notificationContent.title === "Daily Goals") {
  //         setReceivedEndOfDayNotification(true);
  //       }
  //       setUserInteractedWithNotification(true);
  //       console.log("demo:", setUserInteractedWithNotification);
  //       // Open the notification modal
  //       setShowNotificationModal(true);
  //     }
  //   } catch (error) {
  //     console.error("Error handling notification:", error);
  //   }
  // };

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare().then();
  }, []);

  const loadGoalsFromStorage = async () => {
    try {
      const savedGoals = await AsyncStorage.getItem("userGoals");
      if (savedGoals) {
        setUserGoals(JSON.parse(savedGoals));
      }
    } catch (error) {
      console.error("Error loading goals from storage:", error);
    }
  };

  useEffect(async () => {
    //registerForPushNotificationsAsync();
    loadGoalsFromStorage();
    console.log("App mounted.....");
  }, []);

  const saveGoalsToStorage = async (goals, checkedItems) => {
    try {
      const data = {
        goals: goals,
        checkedItems: checkedItems,
      };
      await AsyncStorage.setItem("userGoals", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving goals to storage:", error);
    }
  };

  const checkGoalSettingStatus = async () => {
    try {
      const lastSetDate = await AsyncStorage.getItem("lastSetDate");
      console.log(lastSetDate);
      if (lastSetDate && moment().isSame(moment(lastSetDate), "day")) {
        setShowGoalSetting(true);
      } else {
        setShowGoalSetting(true);
      }
    } catch (error) {
      console.error("Error checking goal setting status:", error);
    }
  };

  const onFinishGoalSetting = useCallback((goals, checkedItems) => {
    if (goals) {
      store.dispatch(setGoals(goals));
      setUserGoals(goals);
      saveGoalsToStorage(goals, checkedItems);
      AsyncStorage.setItem("lastSetDate", moment().format());
    }
    animateDrawer(false); // Close the drawer after goal setting
  }, []);

  const animateDrawer = (open) => {
    Animated.timing(animation, {
      toValue: open ? 1 : 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setShowGoalSetting(open);
    });
  };

  const toggleDrawer = () => {
    animateDrawer(!showGoalSetting);
  };

  const cancelGoalSetting = () => {
    animateDrawer(false);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the splash screen
      await SplashScreen.hideAsync();
      // Show the goal setting drawer if needed
      checkGoalSettingStatus();
      animateDrawer(showGoalSetting);
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  const drawerTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  return (
    <NotificationProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Provider store={store}>
          <CommonProvider>
            {/* <themeContext.Provider value={darkMode === true ? darkMode.dark : darkMode.light}>
                    <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}> */}
            {/*<themeContext.Provider value={theme ? darkMode.dark : darkMode.light}>*/}
            <NavigationContainer>
              <Tabs></Tabs>
            </NavigationContainer>
            {/*</themeContext.Provider>*/}
          </CommonProvider>
          <TouchableOpacity style={styles.drawerHandle} onPress={toggleDrawer}>
            <View style={styles.handleBar} />
          </TouchableOpacity>
          {showGoalSetting && (
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                styles.drawerContainer,
                { transform: [{ translateY: drawerTranslateY }] },
              ]}
            >
              <GoalSettingScreen
                onFinishGoalSetting={onFinishGoalSetting}
                onCancelGoalSetting={cancelGoalSetting}
                setShowGoalSetting={animateDrawer}
              />
            </Animated.View>
          )}
        </Provider>
        {receivedEndOfDayNotification && userInteractedWithNotification && (
          <NotificationModal
            visible={showNotificationModal}
            onClose={() => setShowNotificationModal(false)}
          />
        )}
      </View>
    </NotificationProvider>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    position: "absolute",
    height: "78%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  drawerHandle: {
    position: "absolute",
    top: 10,
    left: "50%",
    width: 40,
    height: 5,
    marginTop: -2.5,
    backgroundColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  handleBar: {
    width: 20,
    height: 3,
    backgroundColor: "white",
    borderRadius: 2,
  },
});
