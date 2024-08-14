import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GameOne from "../Calm/GameOne";
import ViewGoalsButton from "./ViewGoalsButton";
import ActiveHome from "./ActiveHome";
const Stack = createStackNavigator();

function Active() {
  return (
    <Stack.Navigator initialRoutName="ActiveHome">
      <Stack.Screen
        name="ActiveHome"
        component={ActiveHome}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ViewGoalsButton"
        component={ViewGoalsButton}
        options={{ headerShown: true, headerTitle: "Active" }}
      />
    </Stack.Navigator>
  );
}

export default Active;
