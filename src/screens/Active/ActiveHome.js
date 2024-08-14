import React from "react";
import { ScrollView } from "react-native";
import SelectionTile from "../../components/SelectionTile";
import {useGlobalContext} from "../../hooks/useGlobalContext";

function ActiveHome({navigation}) {
    const {
        theme
    } = useGlobalContext();
    return (
        <ScrollView style={{backgroundColor: theme.background}}>
            <SelectionTile name={"🥅 View Daily Goals"} routeTo={'ViewGoalsButton'} navigation={navigation}/>
        </ScrollView>
    );
}

export default ActiveHome;
