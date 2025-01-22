// HomeScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import FilterTabs from './components/FilterTabs';
import TimerCards from './components/TimerCards';
import CreateTimerModal from './components/CreateTimerModal';
import FloatingActionButton from './components/FloatingActionButton';
import TimerCompletionPopup from './components/TimerCompletionPopup';
import { addTimer, startAllTimers, pauseAllTimers, resetAllTimers } from '../../state/timerSlice';

const HomeScreen = () => {
    const navigation = useNavigation(); 
    const [modalVisible, setModalVisible] = useState(false);
    const [timerName, setTimerName] = useState('');
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');
    const [category, setCategory] = useState('Work');
    const [categories, setCategories] = useState(['Work', 'Personal', 'Fitness', 'Study']);
    const [isEditing, setIsEditing] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [isFabExpanded, setIsFabExpanded] = useState(false);
    const [isTimerCompleted, setIsTimerCompleted] = useState(false);
    const [completedTimerName, setCompletedTimerName] = useState('');

    const dispatch = useDispatch();
    const timers = useSelector((state) => state.timer.timers);

    const handleCreateTimer = () => {
        if (!timerName.trim()) {
            alert("Timer name cannot be empty");
            return;
        }

        const duration = `${hours}:${minutes}:${seconds}`;
        dispatch(addTimer({ timerName, duration, category }));
        setModalVisible(false);
        setTimerName('');
        setHours('00');
        setMinutes('00');
        setSeconds('00');
        setCategory('Work');
    };

    const handleAddCustomCategory = () => {
        if (newCategoryName.trim()) {
            setCategories([...categories, newCategoryName]);
            setCategory(newCategoryName);
            setNewCategoryName('');
            setIsEditing(false);
        }
    };

    const handleRemoveCategory = (categoryToRemove) => {
        const updatedCategories = categories.filter((cat) => cat !== categoryToRemove);
        setCategories(updatedCategories);
        if (category === categoryToRemove) {
            setCategory(updatedCategories[0] || '');
        }
    };

    const adjustTime = (type, operation) => {
        let value = type === 'hours' ? parseInt(hours, 10) :
            type === 'minutes' ? parseInt(minutes, 10) :
                parseInt(seconds, 10);

        if (operation === 'increment') {
            value += 1;
        } else if (operation === 'decrement') {
            value -= 1;
        }

        if (type === 'hours') {
            if (value > 23) value = 0;
            if (value < 0) value = 23;
            setHours(value.toString().padStart(2, '0'));
        } else if (type === 'minutes') {
            if (value > 59) value = 0;
            if (value < 0) value = 59;
            setMinutes(value.toString().padStart(2, '0'));
        } else if (type === 'seconds') {
            if (value > 59) value = 0;
            if (value < 0) value = 59;
            setSeconds(value.toString().padStart(2, '0'));
        }
    };

    const toggleFab = () => {
        setIsFabExpanded(!isFabExpanded);
    };

    const handleStartAllTimers = () => {
        dispatch(startAllTimers({ filter: selectedFilter }));
    };

    const handlePauseAllTimers = () => {
        dispatch(pauseAllTimers({ filter: selectedFilter }));
    };

    const handleResetAllTimers = () => {
        dispatch(resetAllTimers({ filter: selectedFilter }));
    };

    const parseDuration = (duration) => {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    const filteredTimers = selectedFilter === 'All'
        ? timers
        : timers.filter((timer) => timer.category === selectedFilter);

    const handleTimerCompletion = (timerName) => {
        setCompletedTimerName(timerName);
        setIsTimerCompleted(true);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.historyButton}
                onPress={() => navigation.navigate('History')}
            >
                <Icon name="time-outline" size={24} color="#72baa0" />
                <Text style={styles.historyButtonText}>History</Text>
            </TouchableOpacity>

            <FilterTabs
                categories={categories}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />

            {filteredTimers.length > 0 ? (
                <TimerCards filteredTimers={filteredTimers} onTimerCompletion={handleTimerCompletion} />
            ) : (
                <View style={styles.emptyStateContainer}>
                    <TouchableOpacity style={styles.emptyStateButton} onPress={() => setModalVisible(true)}>
                        <Icon name="add-circle-outline" size={50} color="#6D758D" />
                        <Text style={styles.emptyStateText}>Create Timer</Text>
                    </TouchableOpacity>
                </View>
            )}

            {timers.length > 0 && (
                <TouchableOpacity style={styles.createButton} onPress={() => setModalVisible(true)}>
                    <Icon name="add" size={30} color="#FFF" />
                </TouchableOpacity>
            )}

            <FloatingActionButton
                isFabExpanded={isFabExpanded}
                toggleFab={toggleFab}
                startAllTimers={handleStartAllTimers}
                pauseAllTimers={handlePauseAllTimers}
                resetAllTimers={handleResetAllTimers}
            />

            <CreateTimerModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                timerName={timerName}
                setTimerName={setTimerName}
                hours={hours}
                setHours={setHours}
                minutes={minutes}
                setMinutes={setMinutes}
                seconds={seconds}
                setSeconds={setSeconds}
                category={category}
                setCategory={setCategory}
                categories={categories}
                handleCreateTimer={handleCreateTimer}
                adjustTime={adjustTime}
                handleRemoveCategory={handleRemoveCategory}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                newCategoryName={newCategoryName}
                setNewCategoryName={setNewCategoryName}
                handleAddCustomCategory={handleAddCustomCategory}
            />

            <TimerCompletionPopup
                isVisible={isTimerCompleted}
                timerName={completedTimerName}
                onClose={() => setIsTimerCompleted(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    historyButton: {
        flexDirection: 'row',
        justifyContent:'flex-end',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal:20,
        marginLeft: 10,
    },
    historyButtonText: {
        fontSize: 16,
        color: '#72baa0',
        marginLeft: 5,
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStateButton: {
        alignItems: 'center',
        gap: 10,
        padding: 10,
    },
    emptyStateText: {
        fontSize: 20,
        color: '#6D758D',
    },
    createButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#72baa0',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 20,
    },
});

export default HomeScreen;