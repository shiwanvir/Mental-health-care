import React, { useState, useEffect, useContext } from "react";
import { Text, ScrollView, View, StyleSheet, Switch } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import darkMode from "../../../styles/darkMode";
//import DarkModeToggle from "react-native-dark-mode-toggle";
// import themeContext from "../../../styles/themeContext";

function ChangeTheme() {
  const { theme, setTheme } = useGlobalContext();

  // const theme = useContext(themeContext);

  // const [darkMode, setDarkMode] = useState(false);

  const handleSetTheme = (value) => {
    if (value) {
      setTheme(darkMode.dark);
    } else {
      setTheme(darkMode.light);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          borderRadius: 10,
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.color, marginRight: 8 }}>Dark Theme</Text>
        <Switch
          value={theme === darkMode.dark}
          onValueChange={(value) => {
            handleSetTheme(value);
            // EventRegister.emit('ChangeTheme', value);
          }}
        />
      </View>
    </View>
  );
}

export default ChangeTheme;
