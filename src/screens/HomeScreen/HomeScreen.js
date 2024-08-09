import { ScrollView, StyleSheet, Text, View, RefreshControl } from "react-native"
import Header from "../../components/Header/Header";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { useData } from "../../../DataContext";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const { fetchMatches } = useData()

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchMatches(); // Fetch the latest data
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <Header title="Home" />

            <ScrollView style={styles.content} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#5E55D7"
                />
            }>
                <View style={styles.playNowContainer}>
                    <Text style={styles.playNowTitle}>Play now</Text>
                    <Text style={styles.playNowText}>Take Part in challenges with friends or other players</Text>
                    <CustomButton
                        text="Start a Game"
                        type="WHITE"
                        onPress={() => navigation.navigate('NewMatch')}
                    />
                </View>

                <View style={styles.recentMatches}>
                    <View style={styles.recentHeader}>
                        <Text style={styles.recentTitle}>Challenges</Text>
                    </View>
                </View>

                {/* <Challenges /> */}
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
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: '100%'
    },
    playNowContainer: {
        backgroundColor: '#746AF6',
        borderRadius: 40,
        paddingVertical: 25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    playNowTitle: {
        textTransform: 'uppercase',
        fontSize: 15,
        color: '#FFFFFF'
    },
    playNowText: {
        textAlign: 'center',
        width: '70%',
        color: '#FFFFFF',
        fontWeight: '600',
        lineHeight: 22,
        fontSize: 15,
        marginVertical: 10
    },

    recentMatches: {
        marginTop: 30
    },
    recentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20
    },
    recentTitle: {
        fontSize: 20,
        fontWeight: '500'
    },
    recentAlls: {
        color: '#5E55D7',
        fontSize: 15,
        fontWeight: '600'
    }
})

export default HomeScreen;