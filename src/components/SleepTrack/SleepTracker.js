import React, {useState, useEffect, useRef, useContext} from 'react';
import { View, Text, Button, TouchableOpacity, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from './styles';
import {useGlobalContext} from "../../hooks/useGlobalContext";
import moment from "moment/moment";
import themeContext from "../../../styles/themeContext";

const SleepTracker = () => {
    const [intakeState, setIntakeState] = useState(false);
    const [showResponse, setShowResponse] = useState(false);
    const responseText = `Hours were recorded..!`;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const {setSleepRecords, theme, setDataEmpty} = useGlobalContext();
    const [sliderValue, setSliderValue] = useState(0);

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

    const recordData = () => {
        setIntakeState(true);
        setDataEmpty(false)
        let rec = {
            date: moment().day(),
            sleepHours: sliderValue
        };

        setSleepRecords(prevRecords => prevRecords.map((day) => {
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
                    <Text style={{...styles.welcome, color: theme.color}}>Good morning! How many hours did you sleep last night?</Text>
                    <View style={styles.scaleContainer}>
                        <TouchableOpacity
                            style={styles.sliderContainer}
                            activeOpacity={0.8}
                        >
                            <Slider
                                style={styles.slider}
                                minimumValue={0}
                                maximumValue={12}
                                step={1}
                                value={sliderValue}
                                onValueChange={(value) => setSliderValue(value)}
                            />
                            <View style={styles.sliderValueContainer}>
                                <Text style={styles.sliderValueText}>{sliderValue}</Text>
                            </View>
                            <TouchableOpacity style={styles.button} onPress={recordData}>
                                <Text style={styles.buttonText}>Done</Text>
                            </TouchableOpacity>
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

export default SleepTracker;
