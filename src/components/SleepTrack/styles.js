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
    sliderValueContainer: {
        alignItems: 'center',
        marginTop: 10,
        
    },
    sliderValueText: {
        fontSize: 12,
        color: '#777',
    },
    scaleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
        
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
    sliderContainer: {
        alignItems: 'center',
        borderRadius: 10
    },
    slider: {
        width: 300,
        height: 20,
        backgroundColor: '#fff',

    },
    sliderValue: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#FFA500',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }

});

export default styles;