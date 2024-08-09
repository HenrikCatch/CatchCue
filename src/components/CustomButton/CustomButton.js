import { View, Text, StyleSheet, Pressable, Keyboard } from 'react-native';
import React from 'react';

const CustomButton = ({ onPress, text, secondText, type = "CONTAINED", disabled = false }) => {
    const handlePress = () => {
        Keyboard.dismiss(); // Dismiss the keyboard
        onPress(); // Execute the provided onPress function
    };

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
                styles.container,
                styles[`container_${type}`],
                pressed && styles.pressed
            ]}
            disabled={disabled}
        >
            <Text style={[styles.text, styles[`text_${type}`]]}>
                {text} {secondText ? <Text style={styles.secondText}>{secondText}</Text> : null}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        marginVertical: 10,
        borderRadius: 20,
    },

    container_CONTAINED: {
        backgroundColor: '#6A5AE0',
    },

    container_WHITE: {
        backgroundColor: '#FFFFFF',
        color: 'black'
    },

    container_OUTLINED: {
        borderWidth: 1,
        borderColor: '#696C75',
    },

    text: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        textAlign: 'center',
        fontSize: 14,
        color: 'white',
        fontWeight: '500'
    },

    text_OUTLINED: {
        color: '#FFFFFF'
    },

    text_WHITE: {
        color: '#5E55D7'
    },

    text_TEXT: {
        color: '#6A5AE0'
    },

    secondText: {
        color: '#F4D144'
    },

    pressed: {
        opacity: 0.75,
    },
});

export default CustomButton;