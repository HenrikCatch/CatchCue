import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor='#696C75'
                style={styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: '10px',
        marginVertical: 10
    },
    input: {
        paddingVertical: 18,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#E5E5E5'
    }
})

export default CustomInput