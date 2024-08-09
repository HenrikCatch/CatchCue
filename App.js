import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import Navigation from './src/navigation/Navigation';

export default function App() {
    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#5E55D7' }} />
            <SafeAreaView style={styles.container}>
                <StatusBar
                    style="light"
                />
                <Navigation />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});
