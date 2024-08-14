import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import NearByMedicalCenter from "../../components/NearByMedicalCenter";
import MoreHome from "./MoreHome";
import NotificationList from "../../components/Notifications/NotificationList";
import DeleteActivityHistory from "../../components/DeleteActivityHistory/DeleteActivityHistory";

const Stack = createStackNavigator();

function More() {
    return (
        <Stack.Navigator initialRoutName="MoreHome">
            <Stack.Screen
                name="MoreHome"
                component={MoreHome}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="NearByMedicalCenter"
                component={NearByMedicalCenter}
                options={{headerShown: true, headerTitle: "More"}}
            />
            <Stack.Screen
                name="DeleteActivityHistory"
                component={DeleteActivityHistory}
                options={{headerShown: true, headerTitle: "More"}}
            />
            <Stack.Screen
                name="Notifications"
                component={NotificationList}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}

export default More;
