import React from "react";
import { ScrollView } from "react-native";
import SelectionTile from "../../components/SelectionTile";
import { useGlobalContext } from "../../hooks/useGlobalContext";

function CalmHome({ navigation }) {
  const { theme } = useGlobalContext();

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      {/*<SelectionTile*/}
      {/*  name={ theme.theme === "light" ? "⚫ Change Theme" : "⚪ Change Theme"}*/}
      {/*  routeTo={"ChangeTheme"}*/}
      {/*  navigation={navigation}*/}
      {/*/>*/}
        <SelectionTile name={"🎲 Calm down game"} routeTo={'GameOne'} navigation={navigation}/>
    </ScrollView>
  );
}

export default CalmHome;
