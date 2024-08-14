import React, {useState, useEffect, useRef, useContext} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import styles from './styles';
import {useGlobalContext} from "../../hooks/useGlobalContext";
import moment from "moment/moment";
import themeContext from "../../../styles/themeContext";

const MedicineTracker = () => {
    const [intakeState, setIntakeState] = useState(false);
    const [showResponse, setShowResponse] = useState(false);
    const responseText = `Response was recorded..!`;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const {setMedicalRecords, theme, setDataEmpty} = useGlobalContext();
    // const theme = useContext(themeContext);

    const randomWelcomeMessage = () => {
        let arr = [
            `Hope you didn't forget your medicine for today`,
            `Just checking, have you already taken your medicine today?`,
            `Hey there! Remember to take your medicine today, did you get a chance to?`,
            `Did you remember to take your medicine today? It's important to stay on track!`,
            `Reminder! Have you taken your medicine yet?`,
            `Quick question: have you checked off your medicine for today? Don't want you to miss it!`
        ];
        return arr[Math.floor(Math.random() * arr.length)];
    };

    useEffect(() => {
        if (intakeState) {
            setShowResponse(true);
            const timer = setTimeout(() => {
                setShowResponse(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [intakeState]);

    useEffect(() => {
        if (!showResponse) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 0,
                useNativeDriver: true,
            }).start();
        }
    }, [showResponse]);

    const recordData = (taken) => {
        setDataEmpty(false)
        setIntakeState(true);
        let rec = {
            date: moment().day(),
            medicineTaken: taken
        };

        setMedicalRecords(prevRecords => prevRecords.map((day) => {
            if (day.date === moment().day()) {
                return rec;
            } else {
                return day;
            }
        }));
    };

    return (
        <>
            {intakeState === false ? (
                <View style={styles.container}>
                    <Text style={{...styles.welcome, color: theme.color}}>{randomWelcomeMessage()}</Text>
                    <View style={styles.emojiContainer}>
                        <TouchableOpacity
                            style={styles.emoji}
                            onPress={() => {
                                recordData(true);
                            }}
                        >
                            <Text style={styles.emojiText}>👍</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.emoji}
                            onPress={() => {
                                recordData(false);
                            }}
                        >
                            <Text style={styles.emojiText}>👎</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <Animated.View
                    style={[
                        {backgroundColor: '#1D741B'},
                        {opacity: fadeAnim},
                    ]}
                >
                    <Text style={styles.selectedOption}>{responseText}</Text>
                </Animated.View>
            )}
        </>
    );
};

export default MedicineTracker;
