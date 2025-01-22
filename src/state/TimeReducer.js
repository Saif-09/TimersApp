import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function to save timers to AsyncStorage
const saveTimersToStorage = async (timers) => {
    await AsyncStorage.setItem('timers', JSON.stringify(timers));
};

// Initial state
const initialState = {
    timers: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
};

// Reducer function
const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TIMERS_REQUEST':
            return { ...state, status: 'loading' };
        case 'FETCH_TIMERS_SUCCESS':
            return { ...state, status: 'succeeded', timers: action.payload };
        case 'FETCH_TIMERS_FAILURE':
            return { ...state, status: 'failed', error: action.payload };
        case 'ADD_TIMER':
            const newTimer = {
                id: Date.now(),
                ...action.payload,
                remainingTime: action.payload.duration,
                status: 'paused',
            };
            const updatedTimers = [...state.timers, newTimer];
            saveTimersToStorage(updatedTimers);
            return { ...state, timers: updatedTimers };
        case 'START_TIMER':
            return {
                ...state,
                timers: state.timers.map((timer) =>
                    timer.id === action.payload ? { ...timer, status: 'running' } : timer
                ),
            };
        case 'PAUSE_TIMER':
            return {
                ...state,
                timers: state.timers.map((timer) =>
                    timer.id === action.payload ? { ...timer, status: 'paused' } : timer
                ),
            };
        case 'RESET_TIMER':
            return {
                ...state,
                timers: state.timers.map((timer) =>
                    timer.id === action.payload
                        ? { ...timer, remainingTime: timer.duration, status: 'paused' }
                        : timer
                ),
            };
        case 'COMPLETE_TIMER':
            return {
                ...state,
                timers: state.timers.map((timer) =>
                    timer.id === action.payload ? { ...timer, status: 'completed' } : timer
                ),
            };
        default:
            return state;
    }
};

export default timerReducer;