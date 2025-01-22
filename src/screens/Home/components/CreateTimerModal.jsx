import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard, StyleSheet, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const CreateTimerModal = ({ 
    modalVisible, 
    setModalVisible, 
    timerName, 
    setTimerName, 
    hours, 
    setHours, 
    minutes, 
    setMinutes, 
    seconds, 
    setSeconds, 
    category, 
    setCategory, 
    categories, 
    handleCreateTimer, 
    adjustTime, 
    handleRemoveCategory, 
    isEditing, 
    setIsEditing, 
    newCategoryName, 
    setNewCategoryName, 
    handleAddCustomCategory,
    halfwayAlert, // Add this prop
    setHalfwayAlert, // Add this prop
}) => {
    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Create New Timer</Text>

                        {/* Timer Name Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Timer Name"
                            value={timerName}
                            placeholderTextColor={'#8E8E8E'}
                            onChangeText={setTimerName}
                        />

                        {/* Duration Input (HH:MM:SS) */}
                        <View style={styles.durationContainer}>
                            <View style={styles.timeInputWrapper}>
                                <Text style={styles.timeLabel}>HH</Text>
                                <View style={styles.timeInputContainer}>
                                    <TouchableOpacity
                                        style={styles.timeButton}
                                        onPress={() => adjustTime('hours', 'increment')}
                                    >
                                        <Icon name="chevron-up" size={20} color="#4A4A4A" />
                                    </TouchableOpacity>
                                    <TextInput
                                        editable={false}
                                        style={styles.timeInput}
                                        value={hours}
                                        onChangeText={(text) => setHours(text.padStart(2, '0'))}
                                        keyboardType="numeric"
                                        maxLength={2}
                                    />
                                    <TouchableOpacity
                                        style={styles.timeButton}
                                        onPress={() => adjustTime('hours', 'decrement')}
                                    >
                                        <Icon name="chevron-down" size={20} color="#4A4A4A" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.timeInputWrapper}>
                                <Text style={styles.timeLabel}>MM</Text>
                                <View style={styles.timeInputContainer}>
                                    <TouchableOpacity
                                        style={styles.timeButton}
                                        onPress={() => adjustTime('minutes', 'increment')}
                                    >
                                        <Icon name="chevron-up" size={20} color="#4A4A4A" />
                                    </TouchableOpacity>
                                    <TextInput
                                        editable={false}
                                        style={styles.timeInput}
                                        value={minutes}
                                        onChangeText={(text) => setMinutes(text.padStart(2, '0'))}
                                        keyboardType="numeric"
                                        maxLength={2}
                                    />
                                    <TouchableOpacity
                                        style={styles.timeButton}
                                        onPress={() => adjustTime('minutes', 'decrement')}
                                    >
                                        <Icon name="chevron-down" size={20} color="#4A4A4A" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.timeInputWrapper}>
                                <Text style={styles.timeLabel}>SS</Text>
                                <View style={styles.timeInputContainer}>
                                    <TouchableOpacity
                                        style={styles.timeButton}
                                        onPress={() => adjustTime('seconds', 'increment')}
                                    >
                                        <Icon name="chevron-up" size={20} color="#4A4A4A" />
                                    </TouchableOpacity>
                                    <TextInput
                                        editable={false}
                                        style={styles.timeInput}
                                        value={seconds}
                                        onChangeText={(text) => setSeconds(text.padStart(2, '0'))}
                                        keyboardType="numeric"
                                        maxLength={2}
                                    />
                                    <TouchableOpacity
                                        style={styles.timeButton}
                                        onPress={() => adjustTime('seconds', 'decrement')}
                                    >
                                        <Icon name="chevron-down" size={20} color="#4A4A4A" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Halfway Alert Toggle */}
                        <View style={styles.halfwayAlertContainer}>
                            <Text style={styles.halfwayAlertText}>Set Halfway Alert</Text>
                            <Switch
                                value={halfwayAlert}
                                onValueChange={setHalfwayAlert}
                                trackColor={{ false: '#D6E3F8', true: '#8CC8B2' }}
                                thumbColor={halfwayAlert ? '#72baa0' : '#F5F5F5'}
                            />
                        </View>

                        {/* Category Selection */}
                        <View style={styles.categoryContainer}>
                            {categories.map((item) => (
                                <View key={item} style={styles.categoryTabWrapper}>
                                    <TouchableOpacity
                                        style={[
                                            styles.categoryTab,
                                            category === item && styles.selectedCategoryTab,
                                        ]}
                                        onPress={() => setCategory(item)}
                                    >
                                        <Text
                                            style={[
                                                styles.categoryTabText,
                                                category === item && styles.selectedCategoryTabText,
                                            ]}
                                        >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                    {category === item && (
                                        <TouchableOpacity
                                            style={styles.removeButton}
                                            onPress={() => handleRemoveCategory(item)}
                                        >
                                            <Entypo name="circle-with-minus" size={16} color="#FF4444" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}
                            {isEditing ? (
                                <TextInput
                                    style={styles.editableTab}
                                    placeholder="New Category"
                                    value={newCategoryName}
                                    placeholderTextColor={'#8E8E8E'}
                                    onChangeText={setNewCategoryName}
                                    autoFocus={true}
                                    onSubmitEditing={handleAddCustomCategory}
                                    onBlur={handleAddCustomCategory}
                                />
                            ) : (
                                <TouchableOpacity
                                    style={styles.customCategoryTab}
                                    onPress={() => setIsEditing(true)}
                                >
                                    <Icon name="add" size={20} color="#4CAF50" />
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Save and Close Buttons */}
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.saveButton, styles.outlineButton]}
                                onPress={handleCreateTimer}
                            >
                                <Text style={styles.saveButtonText}>Save Timer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.closeButton, styles.outlineButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
        backgroundColor: '#FCFBF9',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4A4A4A',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#D6E3F8',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#FFF',
        color: '#4A4A4A',
    },
    durationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },
    timeInputWrapper: {
        alignItems: 'center',
    },
    timeLabel: {
        fontSize: 14,
        color: '#4A4A4A',
        marginBottom: 5,
    },
    timeInputContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    timeInput: {
        width: 50,
        height: 40,
        borderColor: '#D6E3F8',
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        backgroundColor: '#FFF',
        color: '#4A4A4A',
    },
    timeButton: {
        padding: 5,
    },
    halfwayAlertContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    halfwayAlertText: {
        fontSize: 16,
        color: '#4A4A4A',
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 15,
    },
    categoryTabWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },
    categoryTab: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#D6E3F8',
        backgroundColor: '#F5F5F5',
    },
    selectedCategoryTab: {
        backgroundColor: '#8CC8B2',
        borderColor: '#8CC8B2',
    },
    categoryTabText: {
        fontSize: 14,
        color: '#4A4A4A',
    },
    selectedCategoryTabText: {
        color: '#FFF',
    },
    removeButton: {
        position: 'absolute',
        right: -10,
        top: -10,
        padding: 5,
    },
    customCategoryTab: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#8CC8B2',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editableTab: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#8CC8B2',
        backgroundColor: '#FFF',
        width: 120,
        fontSize: 14,
        color: '#4A4A4A',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    saveButton: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 5,
    },
    closeButton: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 5,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#c9c5c5',
    },
    saveButtonText: {
        color: '#72baa0',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButtonText: {
        color: '#f2665e',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CreateTimerModal;