import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const NotificationModal = ({ visible, onClose }) => {
  const [goals, setGoals] = useState([]);
  const [goalText, setGoalText] = useState("");
  useEffect(() => {
    retrieveGoals();
  }, []);

  const retrieveGoals = async () => {
    try {
      const goalsData = await AsyncStorage.getItem("userGoals");
      if (goalsData !== null) {
        const parsedData = JSON.parse(goalsData);
        const goalsArray = parsedData.goals.checkedItems;
        const goalTextValue = parsedData.goals.goals;
        setGoals(goalsArray);
        setGoalText(goalTextValue);
      } else {
        console.log("No goals found.");
        setGoals([]);
        setGoalText("");
      }
    } catch (error) {
      console.error("Error retrieving goals:", error);
    }
  };
  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View>
          <TouchableOpacity>
            <View
              style={{
                ...styles.container,
                //backgroundColor: theme.background,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 20,
                  fontWeight: "bold",
                  //color: theme.color,
                }}
              >
                Your Today's Goals:
              </Text>
            </View>

            <View style={styles.container1}>
              <Text>{goalText}</Text>
              {goals.map((goal, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {index + 1}.{goal}
                </Text>
              ))}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text
              style={{
                alignSelf: "flex-end",
                shadowColor: "black",
                //shadowOffset: 5,
                color: "white",
                fontSize: 15,
                backgroundColor: "red",
                padding: 5,
                borderRadius: 5,
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft: 25,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    marginStart: 10,
    height: 60,
    marginEnd: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  // container1: {
  //   backgroundColor: "#fff",
  //   borderRadius: 5,
  //   paddingLeft: 25,
  //   flexDirection: "column",
  //   alignItems: "center",
  //   marginTop: 10,
  //   marginBottom: 5,
  //   marginStart: 10,
  //   height: 160,
  //   marginEnd: 10,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.22,
  //   shadowRadius: 2.22,
  //   elevation: 3,
  // },
  container1: {
    backgroundColor: "#fff",
    borderRadius: 10,
    // paddingHorizontal: 25,
    // paddingVertical: 5,
    padding: 5,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    minHeight: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignContent: "flex-start",
  },
});
export default NotificationModal;
