import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import TimerCard from '../Home/components/TimerCard';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';


const HistoryScreen = () => {
    const timers = useSelector((state) => state.timer.timers);
    const completedTimers = timers.filter((timer) => timer.isCompleted);

    const exportHistory = async () => {
        try {
            // Convert completed timers to JSON
            const jsonData = JSON.stringify(completedTimers, null, 2);
    
            // Define the file path in the app's document directory
            const filePath = `${RNFS.DocumentDirectoryPath}/timer_history.json`;
    
            // Write the JSON data to the file
            await RNFS.writeFile(filePath, jsonData, 'utf8');
    
            // Share the file using react-native-share
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
            {completedTimers.length > 0 ? (
                <ScrollView contentContainerStyle={styles.timerCardsContainer}>
                    {completedTimers.map((timer) => (
                        <TimerCard key={timer.id} timer={timer} />
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.emptyStateContainer}>
                    <Text style={styles.emptyStateText}>No completed timers yet.</Text>
                </View>
            )}

            {/* Add an export button */}
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
    title: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: '#4A4A4A',
        marginBottom: 20,
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