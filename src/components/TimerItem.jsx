import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StoreContext } from '../../state/store';
import ProgressBar from './ProgressBar';

const TimerItem = ({ timer }) => {
    const { dispatch } = useContext(StoreContext);
    const progress = ((timer.duration - timer.remainingTime) / timer.duration) * 100;

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{timer.name}</Text>
            <Text style={styles.time}>{timer.remainingTime}s remaining</Text>
            <Text style={styles.status}>Status: {timer.status}</Text>
            <ProgressBar progress={progress} />
            <View style={styles.buttons}>
                <Button title="Start" onPress={() => dispatch({ type: 'START_TIMER', payload: timer.id })} />
                <Button title="Pause" onPress={() => dispatch({ type: 'PAUSE_TIMER', payload: timer.id })} />
                <Button title="Reset" onPress={() => dispatch({ type: 'RESET_TIMER', payload: timer.id })} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginBottom: 8,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        elevation: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 14,
        color: '#666',
    },
    status: {
        fontSize: 14,
        color: '#666',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
});

export default TimerItem;