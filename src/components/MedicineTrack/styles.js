import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    emojiContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    emoji: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        margin: 10
    },
    emojiText: {
        fontSize: 30,
    },
    welcome: {
        fontSize: 15,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: "center",
        color: '#333333',
    },
    selectedOption: {
        fontSize: 15,
        margin: 7,
        fontWeight: 'bold',
        textAlign: "center",
        color: '#dcdcdc',
    },
});

export default styles;