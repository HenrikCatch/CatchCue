import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ isAuthenticated: false, token: null });
    const [identity, setIdentity] = useState(null);
    const navigation = useNavigation();

    const apiUrl = 'https://biljard.catchmedia.no/api';

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await axios({
                        method: 'post',
                        url: apiUrl,
                        data: { token, action: 'checkAuth' },
                        headers: { 'Authorization': `Bearer ${token}` },
                    });

                    console.log(response.data)

                    if (response.data.status === 200) {
                        setAuthState({ isAuthenticated: true, token });
                        navigation.navigate('Tabs');
                        fetchIdentity(token);
                    } else {
                        setAuthState({ isAuthenticated: false, token: null });
                    }
                } catch (error) {
                    console.warn('Token validation failed', error);
                    setAuthState({ isAuthenticated: false, token: null });
                }
            }
        };

        checkToken();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios({
                method: 'post',
                url: apiUrl,
                data: { username, password, action: 'login' },
                headers: { 'Content-Type': 'application/json' }
            });

            console.log("Reponsseee: ", response.data)

            if (response.status === 200) {
                const { token } = response.data;
                await AsyncStorage.setItem('authToken', token);
                setAuthState({ isAuthenticated: true, token });
                fetchIdentity(token);
                navigation.navigate('Tabs');
            }
        } catch (error) {
            console.warn('Sign in failed', error);
        }
    };

    const fetchIdentity = async (token) => {
        try {
            const response = await axios({
                method: 'post',
                url: apiUrl,
                data: { action: 'getIdentity' },
                headers: { 'Authorization': `Bearer ${token}` },
            });

            setIdentity(response.data);
        } catch (error) {
            console.warn('Fetching identity failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ authState, login, identity }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);