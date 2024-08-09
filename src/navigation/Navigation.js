import Octicons from '@expo/vector-icons/Octicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthProvider } from '../../AuthContext';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import NewMatch from '../screens/NewMatch/NewMatch';
import { DataProvider } from '../../DataContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FAFAFA',
        border: '#FAFAFA'
    },
};

const Navigation = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <AuthProvider>
                <DataProvider>
                    <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
                        <Stack.Screen name="LogIn" component={LoginScreen} options={{ headerShown: false }} />

                        <Stack.Screen name="NewMatch" component={NewMatch} options={{ headerShown: false }} />

                        {/* Tabs */}
                        <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </DataProvider>
            </AuthProvider>
        </NavigationContainer>
    )
}

const TabNavigator = () => {
    return (
        <Tab.Navigator
            backBehavior='history'
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#fff',
                    shadowColor: 'transparent',
                    elevation: 0,
                    paddingTop: 10,
                    marginBottom: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowOpacity: 0.1,
                    shadowRadius: 15
                },
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#45454D',

            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <Octicons
                            name="home"
                            size={24}
                            color={focused ? '#000000' : '#858493'}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Navigation;