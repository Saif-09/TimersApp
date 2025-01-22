import React from 'react';
import { StoreProvider } from './state/store';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <StoreProvider>
      <AppNavigator />
    </StoreProvider>
  );
};

export default App;