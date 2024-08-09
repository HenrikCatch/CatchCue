import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useAuth } from '../../../AuthContext';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const navigation = useNavigation();

    const handleLogin = () => {
        login(username, password);
    }


    return (
        <View style={styles.loginContainer}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: 'https://biljard.catchmedia.no/assets/billiard/biljard.png',
                    }}
                />
            </View>
            <CustomInput
                placeholder="Username"
                value={username}
                setValue={setUsername}
            />

            <CustomInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <CustomButton
                text="Continue"
                onPress={handleLogin}
            />

            <CustomButton
                text="Forgot password?"
                onPress={handleLogin}
                type="TEXT"
            />

        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        marginTop: 50,
        padding: 30,
    },
    imageContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 40
    },
    logo: {
        width: 687 / 4,
        height: 380 / 4
    }
});

export default LoginScreen;