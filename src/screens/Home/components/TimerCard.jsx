import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { startTimer, pauseTimer, stopTimer, updateTimer, completeTimer } from '../../../state/timerSlice';

const TimerCard = ({ timer, onTimerCompletion }) => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);
    const progress = useRef(new Animated.Value(0)).current;
    const [halfwayAlertTriggered, setHalfwayAlertTriggered] = useState(false);


    if (!timer) {
        return (
            <View style={styles.placeholder}>
                {null}
            </View>
        );
    }

    useEffect(() => {
        let interval;
        if (timer.isRunning && timer.timeLeft > 0) {
            interval = setInterval(() => {
                dispatch(updateTimer({ id: timer.id }));
            }, 1000);
        } else if (timer.timeLeft === 0 && timer.isRunning) {
            dispatch(completeTimer({ id: timer.id }));
            if (onTimerCompletion) {
                onTimerCompletion(timer.timerName);
            }
        }

        // Check for halfway alert
        if (timer.halfwayAlert && !halfwayAlertTriggered && timer.timeLeft <= parseDuration(timer.duration) / 2) {
            Alert.alert('Halfway Alert', 'Your timer is halfway done!');
            setHalfwayAlertTriggered(true);
        }

        return () => clearInterval(interval);
    }, [timer.isRunning, timer.timeLeft, dispatch, timer.id, timer.timerName, onTimerCompletion, timer.halfwayAlert, halfwayAlertTriggered]);

    useEffect(() => {
        Animated.timing(progress, {
            toValue: (parseDuration(timer.duration) - timer.timeLeft) / parseDuration(timer.duration),
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [timer.timeLeft]);

    const parseDuration = (duration) => {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <TouchableOpacity
            style={[
                styles.timerCard,
                timer.isCompleted && styles.completedTimerCard, // Apply completed style if timer is completed
            ]}
            onPress={() => setIsExpanded(!isExpanded)}
            activeOpacity={0.9}
        >
            {/* Timer Details and Controls */}
            <View style={styles.timerDetailsContainer}>
                <View style={styles.timerTextContainer}>
                    <Text style={styles.timerCardTitle}>{timer.timerName}</Text>
                    <Text style={styles.timerCardDuration}>{formatTime(timer.timeLeft)}</Text>
                    <Text style={styles.timerCardCategory}>{timer.category}</Text>
                </View>

                {/* Timer Controls */}
                <View style={styles.controlsContainer}>
                    {!timer.isRunning && !timer.isPaused && (
                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={() => dispatch(startTimer({ id: timer.id }))}
                        >
                            <Icon name="play" size={24} color="#72baa0" />
                        </TouchableOpacity>
                    )}
                    {timer.isRunning && (
                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={() => dispatch(pauseTimer({ id: timer.id }))}
                        >
                            <Icon name="pause" size={24} color="#72baa0" />
                        </TouchableOpacity>
                    )}
                    {timer.isPaused && (
                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={() => dispatch(startTimer({ id: timer.id }))}
                        >
                            <Icon name="play" size={24} color="#72baa0" />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => dispatch(stopTimer({ id: timer.id }))}
                    >
                        <MaterialIcons name="restart-alt" size={24} color="#f2665e" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Progress Bar */}
            {isExpanded && (
                <View style={styles.progressBarContainer}>
                    <Animated.View
                        style={[
                            styles.progressBar,
                            {
                                width: progress.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%'],
                                }),
                            },
                        ]}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    timerCard: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 0,
        overflow: 'hidden',
        position: 'relative',
    },
    completedTimerCard: {
        borderRightWidth: 5, // Add a thick border on the right side
        borderRightColor: '#72baa0', // Greenish color for the border
    },
    placeholder: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timerTextContainer: {
        flex: 1,
    },
    timerCardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A4A4A',
    },
    timerCardDuration: {
        fontSize: 16,
        color: '#6D758D',
        marginTop: 5,
    },
    timerCardCategory: {
        fontSize: 14,
        color: '#8CC8B2',
        marginTop: 5,
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlButton: {
        marginLeft: 10,
    },
    progressBarContainer: {
        height: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        marginTop: 10,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#72baa0',
        borderRadius: 5,
    },
});

export default TimerCard;