import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import HomeHome from "./HomeHome";

const Stack = createStackNavigator();

function Home() {
    return (
        <Stack.Navigator initialRoutName="HomeHome">
            <Stack.Screen
                name="HomeHome"
                component={HomeHome}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}

export default Home;
