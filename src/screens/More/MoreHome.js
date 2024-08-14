import React from "react";
import {ScrollView} from "react-native";
import SelectionTile from "../../components/SelectionTile";
import {useGlobalContext} from "../../hooks/useGlobalContext";

function MoreHome({navigation}) {
    const {theme} = useGlobalContext();
    return (
        <ScrollView style={{backgroundColor: theme.background}}>
            <SelectionTile
                name={"📍 View nearby medical centers"}
                routeTo={"NearByMedicalCenter"}
                navigation={navigation}
            />
            <SelectionTile
                name={"🗑️ Delete my activity history"}
                routeTo={"DeleteActivityHistory"}
                navigation={navigation}
            />
            <SelectionTile name={"🔔 View Notifications"} routeTo={'Notifications'} navigation={navigation}/>
        </ScrollView>
    );
}

export default MoreHome;
