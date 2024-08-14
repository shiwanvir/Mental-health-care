import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MoodCard = ({ mood }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.moodText}>{mood}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 5,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  moodText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default MoodCard;
