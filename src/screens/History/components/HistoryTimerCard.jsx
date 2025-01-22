import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryTimerCard = ({ timer }) => {
    if (!timer) {
        return (
            <View style={styles.placeholder}>
                {null}
            </View>
        );
    }

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <View style={[styles.timerCard, timer.isCompleted && styles.completedTimerCard]}>
            <View style={styles.timerDetailsContainer}>
                <View style={styles.timerTextContainer}>
                    <Text style={styles.timerCardTitle}>{timer.timerName}</Text>
                    <Text style={styles.timerCardDuration}>{formatTime(timer.timeLeft)}</Text>
                    <Text style={styles.timerCardCategory}>{timer.category}</Text>
                </View>
            </View>

            {/* Static Progress Bar */}
            <View style={styles.progressBarContainer}>
                <View
                    style={[
                        styles.progressBar,
                        { width: '100%' }, 
                    ]}
                />
            </View>
        </View>
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
        borderRightWidth: 5,
        borderRightColor: '#72baa0',
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

export default HistoryTimerCard;