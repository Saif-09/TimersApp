import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FloatingActionButton = ({ isFabExpanded, toggleFab, startAllTimers, pauseAllTimers, resetAllTimers }) => {
    return (
        <View style={styles.fabContainer}>
            {isFabExpanded && (
                <>
                    <TouchableOpacity style={styles.fabButton} onPress={startAllTimers}>
                        <Icon name="play" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fabButton} onPress={pauseAllTimers}>
                        <Icon name="pause" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fabButton} onPress={resetAllTimers}>
                        <Icon name="refresh" size={24} color="#FFF" />
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity style={styles.fabMainButton} onPress={toggleFab}>
                <Icon name={isFabExpanded ? "close" : "options"} size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fabMainButton: {
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
    fabButton: {
        backgroundColor: '#72baa0',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 20,
    },
});

export default FloatingActionButton;