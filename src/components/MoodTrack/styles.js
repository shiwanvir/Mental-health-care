import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      padding: 30,
      // borderRadius: 10,
      // borderWidth: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: '#f8f8f8',
      // marginBottom: 0,
      // borderColor: 'blue'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    emojiContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 5,
    },
    emoji: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#ffffff',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      margin: 10
    },
    emojiText: {
      fontSize: 30,
    },
    selectedMood: {
      fontSize: 18,
      marginTop: 10,
      color: '#333333',
    },
  });

  export default styles;