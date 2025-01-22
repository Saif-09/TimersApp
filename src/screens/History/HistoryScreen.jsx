import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';

import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import HistoryTimerCard from './components/HistoryTimerCard';

const HistoryScreen = () => {
    const history = useSelector((state) => state.timer.history); 

    const exportHistory = async () => {
        try {
            const jsonData = JSON.stringify(history, null, 2);
            const filePath = `${RNFS.DocumentDirectoryPath}/timer_history.json`;
            await RNFS.writeFile(filePath, jsonData, 'utf8');
            await Share.open({
                url: `file://${filePath}`,
                type: 'application/json',
                filename: 'timer_history.json',
                message: 'Exporting timer history as JSON',
            });
        } catch (error) {
            console.error('Failed to export timer history:', error);
            Alert.alert(
                'Export Failed',
                'An error occurred while exporting timer history.',
                [{ text: 'OK' }]
            );
        }
    };

    return (
        <View style={styles.container}>
            {history.length > 0 ? (
                <ScrollView contentContainerStyle={styles.timerCardsContainer}>
                    {history.map((timer) => (
                        <HistoryTimerCard key={timer.id} timer={timer} /> 
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.emptyStateContainer}>
                    <Text style={styles.emptyStateText}>No completed timers yet.</Text>
                </View>
            )}

            <TouchableOpacity style={styles.exportButton} onPress={exportHistory}>
                <Text style={styles.exportButtonText}>Export History as JSON</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    timerCardsContainer: {
        paddingBottom: 20,
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
    },
    emptyStateText: {
        fontSize: 18,
        color: '#6D758D',
    },
    exportButton: {
        backgroundColor: '#72baa0',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    exportButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HistoryScreen;