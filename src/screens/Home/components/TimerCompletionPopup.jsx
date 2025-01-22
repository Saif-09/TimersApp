import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons or any other icon set

const TimerCompletionPopup = ({ isVisible, timerName, onClose }) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Celebration Icon */}
                    <Icon name="trophy" size={50} color="#FFD700" style={styles.icon} />
                    <Text style={styles.congratsText}>Congratulations!</Text>
                    <Text style={styles.timerNameText}>
                        Your timer <Text style={{ fontWeight: '600' }}>{timerName}</Text> is completed.
                    </Text>
                    {/* Close Button with Icon */}
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    icon: {
        marginBottom: 10,
    },
    congratsText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginBottom: 10,
    },
    timerNameText: {
        fontSize: 18,
        color: '#4A4A4A',
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#72baa0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    closeIcon: {
        marginRight: 10,
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TimerCompletionPopup;