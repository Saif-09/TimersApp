import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    timers: [], // Active timers
    history: [], // Completed timers (immutable)
    isTimerCompleted: false,
    completedTimerName: '',
};

const saveStateToAsyncStorage = async (state) => {
    try {
        await AsyncStorage.setItem('timerState', JSON.stringify(state));
    } catch (e) {
        console.error('Failed to save state to AsyncStorage', e);
    }
};

const loadStateFromAsyncStorage = async () => {
    try {
        const savedState = await AsyncStorage.getItem('timerState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            if (!parsedState.history) {
                parsedState.history = [];
            }
            return parsedState;
        }
    } catch (e) {
        console.error('Failed to load state from AsyncStorage', e);
    }
    return initialState;
};

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        initializeState: (state, action) => {
            return action.payload || initialState;
        },
        addTimer: (state, action) => {
            const { timerName, duration, category } = action.payload;
            const newTimer = {
                id: Date.now(),
                timerName,
                duration,
                category,
                timeLeft: parseDuration(duration),
                isRunning: false,
                isPaused: false,
                isCompleted: false,
            };
            state.timers.push(newTimer);
            saveStateToAsyncStorage(state);
        },
        startTimer: (state, action) => {
            const timer = state.timers.find((t) => t.id === action.payload.id);
            if (timer) {
                timer.isRunning = true;
                timer.isPaused = false;
            }
            saveStateToAsyncStorage(state);
        },
        pauseTimer: (state, action) => {
            const timer = state.timers.find((t) => t.id === action.payload.id);
            if (timer) {
                timer.isRunning = false;
                timer.isPaused = true;
            }
            saveStateToAsyncStorage(state);
        },
        stopTimer: (state, action) => {
            const timer = state.timers.find((t) => t.id === action.payload.id);
            if (timer) {
                timer.isRunning = false;
                timer.isPaused = false;
                timer.timeLeft = parseDuration(timer.duration);
                timer.isCompleted = false;
            }
            saveStateToAsyncStorage(state);
        },
        updateTimer: (state, action) => {
            const timer = state.timers.find((t) => t.id === action.payload.id);
            if (timer && timer.timeLeft > 0) {
                timer.timeLeft -= 1;
            }
            saveStateToAsyncStorage(state);
        },
        completeTimer: (state, action) => {
            const timer = state.timers.find((t) => t.id === action.payload.id);
            if (timer) {
                timer.isRunning = false;
                timer.isCompleted = true;

                // Log the completed timer in history
                const completedTimer = { ...timer }; // Create a copy of the timer
                state.history.push(completedTimer); // Add it to history

                state.isTimerCompleted = true;
                state.completedTimerName = timer.timerName;
            }
            saveStateToAsyncStorage(state);
        },
        startAllTimers: (state, action) => {
            state.timers.forEach((timer) => {
                if (action.payload.filter === 'All' || timer.category === action.payload.filter) {
                    timer.isRunning = true;
                    timer.isPaused = false;
                }
            });
            saveStateToAsyncStorage(state);
        },
        pauseAllTimers: (state, action) => {
            state.timers.forEach((timer) => {
                if (action.payload.filter === 'All' || timer.category === action.payload.filter) {
                    timer.isRunning = false;
                    timer.isPaused = true;
                }
            });
            saveStateToAsyncStorage(state);
        },
        resetAllTimers: (state, action) => {
            state.timers.forEach((timer) => {
                if (action.payload.filter === 'All' || timer.category === action.payload.filter) {
                    timer.timeLeft = parseDuration(timer.duration);
                    timer.isRunning = false;
                    timer.isPaused = false;
                }
            });
            saveStateToAsyncStorage(state);
        },
    },
});

const parseDuration = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};

export const {
    addTimer,
    startTimer,
    pauseTimer,
    stopTimer,
    updateTimer,
    completeTimer,
    startAllTimers,
    pauseAllTimers,
    resetAllTimers,
} = timerSlice.actions;

export const initializeTimerState = () => async (dispatch) => {
    const loadedState = await loadStateFromAsyncStorage();
    dispatch(timerSlice.actions.initializeState(loadedState));
};

export default timerSlice.reducer;