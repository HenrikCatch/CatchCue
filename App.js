import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import { AuthProvider, useAuth } from './AuthContext';
import { DataProvider } from './DataContext';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import LeaderboardScreen from './src/screens/Leaderboard/LeaderboardScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import NewMatch from './src/screens/NewMatch/NewMatch';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';

// Stacks
const HomeStack = createNativeStackNavigator();
const LeaderboardStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// Tabs
const Tab = createBottomTabNavigator();

// Themes
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FAFAFA',
        border: '#FAFAFA'
    },
};

// Screens
function HomeStackScreen() {
    const { authState } = useAuth();
    return (
        <HomeStack.Navigator
            screenOptions={{
                gestureEnabled: false
            }}
        >
            {authState.isAuthenticated ? (
                <>
                    <HomeStack.Screen
                        name="HomePage"
                        component={HomeScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <HomeStack.Screen
                        name="NewMatch"
                        component={NewMatch}
                        options={{
                            headerShown: false
                        }}
                    />
                </>
            ) : (
                <HomeStack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false
                    }}
                />
            )}
        </HomeStack.Navigator>
    );
}

function LeaderboardStackScreen() {
    return (
        <LeaderboardStack.Navigator>
            <LeaderboardStack.Screen
                name="LeaderboardPage"
                component={LeaderboardScreen}
                options={{
                    headerShown: false
                }}
            />
        </LeaderboardStack.Navigator>
    )
}

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen
                name="ProfilePage"
                component={ProfileScreen}
                options={{
                    headerShown: false
                }}
            />
        </ProfileStack.Navigator>
    )
}

const AppContent = () => {
    const { authState } = useAuth();
    return (
        authState.isAuthenticated ? (
            <Tab.Navigator
                backBehavior='history'
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#FFFFFF',
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
                    gestureEnabled: false

                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStackScreen}
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
                <Tab.Screen
                    name="Leaderboard"
                    component={LeaderboardStackScreen}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <Ionicons
                                name="podium-outline"
                                size={24}
                                color={focused ? '#000000' : '#858493'}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileStackScreen}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <Feather
                                name="user"
                                size={24}
                                color={focused ? '#000000' : '#858493'}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
        ) : (
            <HomeStackScreen />
        )
    )
}

export default function App() {
    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#5E55D7' }} />
            <View style={styles.container}>
                <StatusBar
                    style="light"
                />
                <NavigationContainer theme={MyTheme}>
                    <AuthProvider>
                        <DataProvider>
                            <AppContent />
                        </DataProvider>
                    </AuthProvider>
                </NavigationContainer>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
});
