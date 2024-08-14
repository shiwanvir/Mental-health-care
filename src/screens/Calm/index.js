import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChangeTheme from "./ChangeTheme";
import ScreenB from "./ScreenB";
import CalmHome from "./CalmHome";
import GameOne from "./GameOne";
const Stack = createStackNavigator();

function Calm() {
  return (
    <Stack.Navigator initialRoutName="CalmHome">
      <Stack.Screen
        name="CalmHome"
        component={CalmHome}
        options={{ headerShown: false }}
      />
      {/*<Stack.Screen*/}
      {/*  name="ChangeTheme"*/}
      {/*  component={ChangeTheme}*/}
      {/*  options={{ headerShown: true, headerTitle: "Calm" }}*/}
      {/*/>*/}
        <Stack.Screen
            name="GameOne"
            component={GameOne}
            options={{ headerShown: true, headerTitle: "Calm" }}
        />
      {/* <Stack.Screen
        name="ScreenB"
        component={ScreenB}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}

export default Calm;
