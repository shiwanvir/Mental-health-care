import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import styles from "../Active/style";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { NotificationContext } from "../../hooks/useNotificationContext";
const { width, height } = Dimensions.get("window");
const android = Platform.OS == "android";

const randomTexts = [
  "Keep going!",
  "You can do it",
  "You're doing great!",
  "Almost there!",
  "Fantastic!",
  "Nice work!",
  "Calm Down",
  "Let it Be",
  "Time will Fly",
  "You are awesome",
];
const avatars = [
  require("../../../assets/Avatar/one.png"),
  require("../../../assets/Avatar/two.png"),
  require("../../../assets/Avatar/three.png"),
  require("../../../assets/Avatar/four.png"),
  require("../../../assets/Avatar/five.png"),
  require("../../../assets/Avatar/six.png"),
  require("../../../assets/Avatar/seven.png"),
  require("../../../assets/Avatar/eight.png"),
  require("../../../assets/Avatar/nine.png"),
  require("../../../assets/Avatar/ten.png"),
];

const GameOne = () => {
  const [count, setCount] = useState(0);
  const [randomIndex, setRandomIndex] = useState(0);
  const { theme } = useGlobalContext();
  const { scheduleNotification } = useContext(NotificationContext);

  const incrementCount = async () => {
    if (count < 10) {
      setCount(count + 1);
      setRandomIndex(Math.floor(Math.random() * randomTexts.length));
    }
  };

  const handlePlayAgain = () => {
    resetCount();
  };

  const handlePress = async () => {
    if (count === 10) {
      await scheduleNotification(
        "CDG",
        "Clam down Game",
        "Congratulations..you have completed the game",
        3
      );
      Alert.alert(
        "Congratulations!",
        "Great job! Do you want to start the count again?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", onPress: handlePlayAgain },
        ]
      );
    }
  };

  const resetCount = () => {
    setCount(0);
  };

  const renderAvatars = () => {
    const avatarViews = [];
    if (count > 0) {
      const lastAvatarIndex = Math.min(count - 1, avatars.length - 1);
      const progressBarColor = `rgb(${255 - count * 25}, ${count * 25}, 0)`;
      avatarViews.push(
        <View
          key="progressBar"
          style={[styles.progressBar, { borderColor: progressBarColor }]}
        />,
        <Image
          key={lastAvatarIndex}
          source={avatars[lastAvatarIndex]}
          style={styles.avatar}
          resizeMode="contain"
        />
      );
    }

    return avatarViews;
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      <View
        style={{
          borderRadius: 40,
          backgroundColor: theme.background,
          height: android ? height * 0.6 : height * 0.5,
          width: width * 0.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>{renderAvatars()}</View>
        <Text style={styles.count}>{count}</Text>
        <Text style={styles.text}>{randomTexts[randomIndex]}</Text>
        {count === 10 ? (
          <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={incrementCount}
            disabled={count >= 10}
            style={[styles.button, count >= 10 && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>Press Me</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default GameOne;
