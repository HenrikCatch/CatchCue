import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import AnimatedNumbers from 'react-native-animated-numbers';

const MatchSummary = ({ visible, onClose, data }) => {
    const [animateToNumber, setAnimateToNumber] = useState(7979);

    const [animatePlayerAScore, setAnimatePlayerAScore] = useState();

    useEffect(() => {
        if (visible) {
            setAnimatePlayerAScore(data?.ratingA_before);
            setTimeout(() => {
                setAnimatePlayerAScore(data?.ratingA_after);
            }, 1000)
        }
    }, [visible]);

    const handleClose = () => {
        // Lukk modalen
        onClose();
    };

    return (
        <Modal transparent={true} visible={visible} animationType="fade">
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Match Summary</Text>

                    <Text style={styles.playerTitle}>Player A</Text>

                    <AnimatedNumbers
                        includeComma
                        animateToNumber={animatePlayerAScore}
                        fontStyle={{ fontSize: 24, fontWeight: 'bold' }}
                    />

                    <Button onPress={handleClose} title='Close' />

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    playerTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default MatchSummary;