import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useData } from '../../../DataContext';
import CustomButton from '../../components/CustomButton/CustomButton';
import Header from '../../components/Header/Header';
import PersonListModal from './PersonListModal';
import AntDesign from '@expo/vector-icons/AntDesign';
import MatchSummary from './MatchSummary';

const NewMatch = () => {
    const [players, setPlayers] = useState([]);
    const [playerA, setPlayerA] = useState(null);
    const [playerB, setPlayerB] = useState(null);
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [summaryVisible, setSummaryVisible] = useState(false);
    const [response, setResponse] = useState();

    const { handleMatchSave, fetchPlayers, getFirstLetter } = useData();
    const navigation = useNavigation();

    const handleSelectPerson = (id) => {
        if (selectedField === 'playerA') {
            setPlayerA(id);
        } else if (selectedField === 'playerB') {
            setPlayerB(id);
        }
        setModalVisible(false);
    };

    const getPersonInfo = (id) => {
        return players.find(person => person.id === id) || { name: 'Unknown', photo: '' };
    };

    const playerAInfo = getPersonInfo(playerA);
    const playerBInfo = getPersonInfo(playerB);

    useEffect(() => {
        fetchPlayers(setPlayers);
    }, []);

    return (
        <View style={styles.container}>
            <Header title="New Match" back={true} />

            <View style={styles.content}>
                <View style={styles.circlesContainer}>
                    <TouchableOpacity
                        style={[styles.circle, playerA && styles.selectedCircle]}
                        onPress={() => {
                            setSelectedField('playerA');
                            setModalVisible(true);
                        }}
                    >
                        {playerAInfo.photo ? (
                            <Image source={{ uri: playerAInfo.photo }} style={styles.profilePicture} />
                        ) : (
                            playerAInfo.name !== 'Unknown' ? (
                                <Text style={{ fontSize: 28, color: 'white', fontWeight: '500' }}>{getFirstLetter(playerAInfo.fullname)}</Text>
                            ) : (
                                <AntDesign name="user" size={30} color="white" />
                            )
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.circle, playerB && styles.selectedCircle]}
                        onPress={() => {
                            setSelectedField('playerB');
                            setModalVisible(true);
                        }}
                    >
                        {playerBInfo.photo ? (
                            <Image source={{ uri: playerBInfo.photo }} style={styles.profilePicture} />
                        ) : (
                            playerBInfo.name !== 'Unknown' ? (
                                <Text style={{ fontSize: 28, color: 'white', fontWeight: '500' }}>{getFirstLetter(playerBInfo.fullname)}</Text>
                            ) : (
                                <AntDesign name="user" size={30} color="white" />
                            )
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.scoresContainer}>
                    <View style={styles.scoreBox}>
                        <View style={styles.scoreControls}>
                            <TouchableOpacity
                                onPress={() => setScoreA(prevScore => Math.max(prevScore - 1, 0))}
                                style={styles.controlButton}
                            >
                                <Text style={styles.controlText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.scoreValue}>{scoreA}</Text>
                            <TouchableOpacity onPress={() => setScoreA(prevScore => prevScore + 1)} style={styles.controlButton}>
                                <Text style={styles.controlText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.scoreBox}>
                        <View style={styles.scoreControls}>
                            <TouchableOpacity
                                onPress={() => setScoreB(prevScore => Math.max(prevScore - 1, 0))}
                                style={styles.controlButton}
                            >
                                <Text style={styles.controlText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.scoreValue}>{scoreB}</Text>
                            <TouchableOpacity onPress={() => setScoreB(prevScore => prevScore + 1)} style={styles.controlButton}>
                                <Text style={styles.controlText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <CustomButton
                    text="Save game"
                    onPress={async () => {
                        const response = await handleMatchSave(playerA, scoreA, playerB, scoreB);
                        setResponse(response)
                        setSummaryVisible(true); // Show the summary modal after saving
                    }}
                />

                <PersonListModal
                    visible={modalVisible}
                    onSelectPerson={handleSelectPerson}
                    onClose={() => setModalVisible(false)}
                    persons={players}
                    filterId={selectedField === 'playerA' ? playerB : playerA}
                />

                <MatchSummary
                    visible={summaryVisible}
                    onClose={() => setSummaryVisible(false)}
                    data={response}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5E55D7'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    content: {
        paddingHorizontal: 30,
        paddingTop: 30,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: '100%'
    },
    circlesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#5E55D7',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#5E55D7',
    },
    selectedCircle: {
        borderColor: '#5E55D7',
    },
    profilePicture: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    circleText: {
        fontSize: 16,
        textAlign: 'center',
    },
    scoresContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    scoreBox: {
        marginBottom: 20,
    },
    scoreLabel: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    scoreControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#5E55D7',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    controlText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    scoreValue: {
        fontSize: 24,
        marginHorizontal: 10,
    },
});

export default NewMatch;