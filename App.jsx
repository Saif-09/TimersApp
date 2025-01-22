import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/state/store';
import { Provider, useDispatch } from 'react-redux';
import { initializeTimerState } from './src/state/timerSlice';

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeTimerState());
    }, [dispatch]);

    return <AppNavigator />;
};

export default AppWrapper;