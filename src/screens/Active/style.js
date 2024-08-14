import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  count: {
    fontSize: 70,
    marginBottom: 40,
    fontWeight: "bold",
    color: "#1D741B", // Green
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  avatar: {
    width: 140, // Customize the width as per your requirement
    height: 140, // Customize the height as per your requirement
    borderRadius: 25, // Customize the borderRadius as per your preference
    marginBottom: 80,
    //padding: 30,
    // marginTop: 10,
    // marginHorizontal: 15,
    margin: 30,
    // justifyContent: "center",
  },
  progressBar: {
    position: "absolute",
    borderWidth: 3,
    borderColor: "red",
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#FFA500", //Orange
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    // color: "white",
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
export default styles;
