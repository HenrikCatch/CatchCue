import { useState } from "react";
import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { useData } from "../../../DataContext";
import Header from "../../components/Header/Header";


const LeaderboardScreen = () => {
    const { leaderboard, getFirstLetter, fetchLeaderboard } = useData();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchLeaderboard(); // Fetch the latest data
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <Header title="Leaderboard" />

            <ScrollView
                style={styles.content}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#5E55D7"
                    />
                }
            >
                {leaderboard?.map((player, index) => (
                    <View style={styles.playerBox} key={player.player_id}>
                        <View style={styles.rank}>
                            <Text style={{ fontSize: 15, color: '#6B6B6B' }}>{index + 1}</Text>
                        </View>
                        <View style={styles.profileIcon}>
                            {player.photo ? (
                                <Image source={{ uri: player.photo }} style={styles.profilePicture} />
                            ) : (
                                <Text style={styles.profileIconText}>{getFirstLetter(player.name)}</Text>
                            )}
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileInfoName}>{player.name}</Text>
                            <Text style={styles.profileInfoScore}>{player.total_points} points</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5E55D7'
    },
    content: {
        paddingHorizontal: 30,
        paddingTop: 30,
        backgroundColor: '#F7F6FE',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: '100%'
    },
    playerBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginBottom: 15,
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center'
    },
    rank: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#C9C9C9',
        alignItems: 'center',
        justifyContent: 'center',

    },
    profileIcon: {
        backgroundColor: '#5E55D7',
        width: 53,
        height: 53,
        borderRadius: 53 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15
    },
    profileIconText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 21,
    },
    profileInfo: {

    },
    profileInfoName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#0E0D25'
    },
    profileInfoScore: {
        color: '#858493',
        fontSize: 13,
        marginTop: 2,
        fontWeight: '300'
    },
    profilePicture: {
        width: '90%',
        height: '90%',
        borderRadius: 50
    }
})

export default LeaderboardScreen;