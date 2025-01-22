import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import TimerItem from './TimerItem';

const CategorySection = ({ category, timers }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleExpand} style={styles.header}>
                <Text style={styles.categoryText}>{category}</Text>
                <Text style={styles.arrow}>{isExpanded ? '▼' : '▶'}</Text>
            </TouchableOpacity>
            {isExpanded && (
                <FlatList
                    data={timers}
                    renderItem={({ item }) => <TimerItem timer={item} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    arrow: {
        fontSize: 16,
    },
});

export default CategorySection;