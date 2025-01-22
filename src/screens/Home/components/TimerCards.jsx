import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import TimerCard from './TimerCard';

const TimerCards = ({ filteredTimers, onTimerCompletion }) => {
    console.log(filteredTimers, "filteredTimers");
    return (
        <ScrollView contentContainerStyle={styles.timerCardsContainer}>
            {filteredTimers.map((timer, index) => (
                <TimerCard
                    key={index}
                    timerName={timer.timerName}
                    duration={timer.duration}
                    category={timer.category}
                    isRunning={timer.isRunning}
                    isPaused={timer.isPaused}
                    timeLeft={timer.timeLeft}
                    timer={{ ...timer }}
                    onTimerCompletion={onTimerCompletion}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    timerCardsContainer: {
        padding: 20,
    },
});

export default TimerCards;