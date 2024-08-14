import React from "react";
import {Text, Image, View} from "react-native";

const Mind2Header = (props) => {
  const {screenName, showLogo = true} = props;
  return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
          {showLogo &&
              <Image
                  source={require('../../assets/icon.png')}
                  style={{ width: 30, height: 30, margin: 5 }}
                  resizeMode="contain"
            />
          }
          <Text style={{ marginLeft: 5, fontWeight: "bold", fontSize: 16 }}>{screenName}</Text>
      </View>
  );
};

export default Mind2Header;
