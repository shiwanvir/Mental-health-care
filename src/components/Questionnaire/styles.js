import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    //   alignItems: 'center',
    //   justifyContent: 'center',
      backgroundColor: '#fff', // Customize the background color
    },
    startContainer: {
      alignItems: 'center',
    },
    heading: {
      fontSize: 24,
      marginBottom: 20,
      color: '#333333', // Customize the text color
    },
    confirmationText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },
    startButton: {
      backgroundColor: '#FFA500', // Customize the button background color
    },
    card: {
      width: '100%',
      marginBottom: 20,
      elevation: 2, // Customize the card elevation (shadow)
    },
    question: {
      fontSize: 18,
      marginBottom: 10,
      color: '#333', // Customize the text color
    },
    answerOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Add this to distribute elements evenly
      margin: 5,
        marginBottom: 10,
    },
    answerText: {
      marginRight: 10,
      color: '#333', // Customize the text color
    },
    submitButton: {
      backgroundColor: '#FFA500', // Customize the button background color
      marginTop: 20,
    },
    congratulationsContainer: {
        alignItems: 'center',
    },
    congratulationsText: {
        fontSize: 24,
        marginBottom: 20,
        color: '#009688', // Customize the text color
    },
  });
  
export default styles;
