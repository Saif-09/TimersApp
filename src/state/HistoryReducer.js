import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to save history to AsyncStorage
const saveHistoryToStorage = async (history) => {
    await AsyncStorage.setItem('history', JSON.stringify(history));
};

// Initial state
const initialState = {
    completedTimers: [],
};

// Reducer function
const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_HISTORY':
            const updatedHistory = [...state.completedTimers, action.payload];
            saveHistoryToStorage(updatedHistory);
            return { ...state, completedTimers: updatedHistory };
        default:
            return state;
    }
};

export default historyReducer;