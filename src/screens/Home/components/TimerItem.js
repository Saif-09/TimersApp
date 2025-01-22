import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TimerItem = ({ timer, dispatch }) => {
    const updateTimer = (id, status) => {
        dispatch({
            type: 'UPDATE_TIMER',
            payload: { id, updates: { status } },
        });
    };

    const resetTimer = (id) => {
        dispatch({ type: 'RESET_TIMER', payload: { id } });
    };

    return (
        <View style={styles.timerItem}>
            <Text>{timer.name} ({timer.status})</Text>
            <Text>Time left: {timer.remaining}s</Text>
            <View style={styles.buttonGroup}>
                <Button title="Start" onPress={() => updateTimer(timer.id, 'Running')} />
                <Button title="Pause" onPress={() => updateTimer(timer.id, 'Paused')} />
                <Button title="Reset" onPress={() => resetTimer(timer.id)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    timerItem: {
        padding: 15,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default TimerItem;
