import React, { useReducer } from 'react';
import timerReducer from './timerReducer';
import historyReducer from './historyReducer';

const combineReducers = (reducers) => {
    return (state = {}, action) => {
        const newState = {};
        for (const key in reducers) {
            newState[key] = reducers[key](state[key], action);
        }
        return newState;
    };
};

const rootReducer = combineReducers({
    timers: timerReducer,
    history: historyReducer,
});

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, {
        timers: { timers: [], status: 'idle', error: null },
        history: { completedTimers: [] },
    });

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};