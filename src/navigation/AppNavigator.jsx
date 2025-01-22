import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryScreen from '../screens/History/HistoryScreen';
import HomeScreen from '../screens/Home/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Timers',
                        headerStyle: {
                            backgroundColor: '#DDF4E3',
                        },
                        headerTintColor: '#4A4A4A',
                        headerTitleStyle: {
                            fontWeight: '400',
                            fontSize: 24,
                        },
                        headerTitleAlign: 'center', 
                    }}
                />

                <Stack.Screen
                    name="History"
                    component={HistoryScreen}
                    options={{
                        title: 'History',
                        headerStyle: {
                            backgroundColor: '#DDF4E3',
                        },
                        headerTintColor: '#4A4A4A',
                        headerTitleStyle: {
                            fontWeight: '400',
                            fontSize: 24,
                        },
                        headerTitleAlign: 'center',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;