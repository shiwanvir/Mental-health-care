import React, {useState, useRef, useEffect} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity, Animated, Easing} from 'react-native';
import {useGlobalContext} from "../../hooks/useGlobalContext";

const DeleteActivityHistory = ({navigation}) => {
    const {clearData, dataEmpty} = useGlobalContext();
    const [deleted, setDeleted] = useState(false)
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const animation = Animated.sequence([
        Animated.timing(scaleAnim, {
            toValue: 10,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        })
    ]);
    useEffect( () => {
        if (dataEmpty) {
            setDeleted(true);
            playAnimation().then(() => {
                navigation.goBack();
            });
        }
    }, []);

    const playAnimation = async () => {
        return new Promise((resolve) => {
            animation.start(() => {
                animation.stop();
                setTimeout(() => {
                    resolve();
                }, 1500); // 1 second delay
            });
        });
    };


    return (
        <View style={styles.container}>
            {!deleted &&
                <>
                    <View style={{paddingLeft: 50, paddingRight: 50}}>
                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>Data will be deleted permanently, and
                            you will NOT be able to restore the data.</Text>
                        <Text style={{fontWeight: 'bold', textAlign: 'center', marginTop: 15}}>Are you sure you want to
                            delete all activity history?</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: 'silver'}]}
                        >
                            <Text style={styles.buttonText}>
                                No
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async () => {
                                clearData();
                                setDeleted(true);
                                playAnimation().then(() => {
                                    navigation.goBack();
                                });
                            }}
                        >
                            <Text style={styles.buttonText}>
                                Yes
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
            {deleted &&
                <>
                    <Animated.View style={{alignItems: "center", transform: [{scale: scaleAnim}]}}>
                        <Image
                            source={require('../../../assets/done.png')}
                            style={{width: 8, height: 8, margin: 3}}
                            resizeMode="contain"
                        />
                        <Text style={{fontSize: 1, fontWeight: 'bold'}}>Activity history cleared</Text>
                    </Animated.View>
                </>
            }
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#ef002c", //Orange
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row"
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default DeleteActivityHistory;