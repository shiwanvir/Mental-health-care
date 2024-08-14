import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useState, useEffect } from "react";
import MoodCard from "../../components/MoodTrack/MoodCard";

const Track = () => {
  const {
    medicineTrackerEnabled,
    sleepTrackerEnabled,
    sleepRecords,
    medicalRecords,
    moodRecords,
    theme
  } = useGlobalContext();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const sleepChartLabels = [];
  for (let i = 0; i <= 6; i++) {
    const dayName = moment()
      .subtract(6 - i, "days")
      .format("ddd");
    sleepChartLabels.push(dayName);
  }
  const sleepHourData = sleepRecords.map((record) => record.sleepHours);

  const [moodData, setMoodData] = useState([]);

  const retrieveMoodData = async (setDataCallback) => {
    try {
      const currentDate = new Date().toISOString().split("T")[0]; // Get the current date

      const updateData = async () => {
        const existingData = await AsyncStorage.getItem(currentDate); // Retrieve existing data for the current date
        if (existingData) {
          const parsedData = JSON.parse(existingData);
          setDataCallback(parsedData);
        } else {
          setDataCallback([]);
        }
      };

      // Call the update function initially
      await updateData();

      // Subscribe to changes in AsyncStorage
      const subscription = AsyncStorage.addListener("change", async () => {
        await updateData();
      });

      return () => {
        // Clean up the subscription when the component unmounts
        subscription.remove();
      };
    } catch (error) {
      console.log("Error retrieving mood data:", error);
      return () => {}; // Return an empty function as cleanup when there's an error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const unsubscribe = await retrieveMoodData(setMoodData);
      return () => {
        unsubscribe(); // Clean up the subscription when the component unmounts
      };
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={{...styles.container, backgroundColor: theme.background}}>

      {/* Mood Tracker */}
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.title}>Mood during the week</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.trackerContainer}>
        {moodRecords.map((state, index) => {
          const dayName = moment()
              .subtract(6 - index, "days")
              .format("ddd");

          if (state.mood === undefined) {
            return (
                <View style={styles.dayContainer} key={index}>
                  <Feather name="circle" size={22} color={"#dadada"} />
                  <Text
                      style={[
                        styles.dayText,
                      ]}
                  >
                    {dayName}
                  </Text>
                </View>
            );
          }

          return (
              <View style={styles.dayContainer} key={index}>
                <Text>{state.mood}</Text>
                <Text
                    style={[
                      styles.dayText,
                    ]}
                >
                  {dayName}
                </Text>
              </View>
          );
        })}
      </View>

      {/* Medicine Tracker */}
      {medicineTrackerEnabled && (
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.title}>Medicine intake for the week</Text>
          <View style={styles.line} />
        </View>
      )}
      {medicineTrackerEnabled && (
        <View style={styles.trackerContainer}>
          {medicalRecords.map((state, index) => {
            const dayName = moment()
              .subtract(6 - index, "days")
              .format("ddd");

            if (state.medicineTaken === undefined) {
              return (
                <View style={styles.dayContainer} key={index}>
                  <Feather name="square" size={34} color={"#dadada"} />
                  <Text
                    style={[
                      styles.dayText,
                    ]}
                  >
                    {dayName}
                  </Text>
                </View>
              );
            }

            return (
              <View style={styles.dayContainer} key={index}>
                <Feather
                  name={state.medicineTaken ? "check-square" : "x-square"}
                  size={34}
                  color={state.medicineTaken ? "#2aa627" : "#ff5959"}
                />
                <Text
                  style={[
                    styles.dayText,
                  ]}
                >
                  {dayName}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      {/* Sleep Tracker */}
      {sleepTrackerEnabled && (
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.title}>Sleep tracker for the week</Text>
          <View style={styles.line} />
        </View>
      )}
      {sleepTrackerEnabled && (
        <View style={styles.trackerContainer2}>
          <LineChart
            data={{
              labels: sleepChartLabels,
              datasets: [
                {
                  data: sleepHourData,
                },
              ],
            }}
            width={screenWidth - 40}
            height={screenHeight / 3}
            yAxisLabel=""
            yAxisSuffix="h"
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.chart}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  trackerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  trackerContainer2: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    paddingRight: 30,
    paddingTop: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
  },
  dayContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  emptyDayContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#ddd",
    borderRadius: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    marginTop: 5,
  },
  emptyDayText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#777",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginBottom: 0,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#c4c4c4",
  },
  title: {
    color: "#838383",
    marginHorizontal: 5,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  moodContainer: {
    flex: 1,
    padding: 16,
  },
  moodHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default Track;
