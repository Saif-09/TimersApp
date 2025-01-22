import React, { useEffect, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { StoreContext } from '../../state/store';
import CategorySection from '../../components/CategorySection';

const HomeScreen = () => {
    const { state, dispatch } = useContext(StoreContext);
    const { timers } = state.timers;

    useEffect(() => {
        const fetchTimers = async () => {
            dispatch({ type: 'FETCH_TIMERS_REQUEST' });
            try {
                const storedTimers = JSON.parse(await AsyncStorage.getItem('timers')) || [];
                dispatch({ type: 'FETCH_TIMERS_SUCCESS', payload: storedTimers });
            } catch (error) {
                dispatch({ type: 'FETCH_TIMERS_FAILURE', payload: error.message });
            }
        };
        fetchTimers();
    }, [dispatch]);

    // Group timers by category
    const groupedTimers = timers.reduce((acc, timer) => {
        if (!acc[timer.category]) acc[timer.category] = [];
        acc[timer.category].push(timer);
        return acc;
    }, {});

    return (
        <View style={styles.container}>
            <Button title="Add Timer" onPress={() => dispatch({ type: 'ADD_TIMER', payload: { name: 'New Timer', duration: 60, category: 'Work' } })} />
            <FlatList
                data={Object.entries(groupedTimers)}
                renderItem={({ item }) => (
                    <CategorySection category={item[0]} timers={item[1]} />
                )}
                keyExtractor={(item) => item[0]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

export default HomeScreen;