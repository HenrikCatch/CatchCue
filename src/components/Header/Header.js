import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from "../../../AuthContext";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useData } from "../../../DataContext";
import { useEffect, useState } from "react";

const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return 'Good Morning';
    } else if (hour < 18) {
        return 'Good Day';
    } else {
        return 'Good Evening';
    }
};
const getTimeOfDayGreetingIcon = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return <Feather name="sun" size={16} color="#FFFFFF" />
    } else if (hour < 18) {
        return <Feather name="sun" size={16} color="#FFFFFF" />;
    } else {
        return <Ionicons name="cloudy-night-outline" size={16} color="#FFFFFF" />;
    }
};
const getFirstLetter = (input) => {
    if (typeof input !== 'string' || input.length === 0) {
        return '';
    }
    return input.charAt(0);
}

const Header = ({ title }) => {
    const { identity } = useAuth();
    const { rank, points, totalPlayers } = useData();

    const greeting = getTimeOfDayGreeting();
    const icon = getTimeOfDayGreetingIcon();
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            {title === 'Home' ? (
                <>
                    <View style={styles.container}>
                        <View style={styles.secondContainer}>
                            <View style={styles.headerContainer}>
                                {icon}
                                <Text style={styles.greetingText}>{greeting}</Text>
                            </View>
                            <Text style={styles.nameText}>{identity?.fullName}</Text>
                        </View>
                        <View style={styles.profileIcon}>
                            <Text style={styles.profileIconText}>{getFirstLetter(identity?.fullName)}</Text>
                        </View>
                    </View>

                    <View style={styles.playerInfo}>
                        <View style={styles.rank}>
                            <View style={styles.rankIcon}>
                                <Ionicons name="trophy-outline" size={25} color="black" />
                            </View>
                            <View style={styles.rankText}>
                                <Text style={styles.rankTextTitle}>Rank</Text>
                                <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'baseline' }}>
                                    <View>
                                        <Text style={styles.rankTextNumber}>{rank}</Text>
                                    </View>
                                    <View style={{ marginHorizontal: 3 }}>
                                        <Text style={styles.rankTextNumberDivider}>/</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.rankTextNumberSecondary}>{totalPlayers}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.verticalDivider}></View>

                        <View style={styles.rank}>
                            <View style={styles.rankIcon}>
                                <FontAwesome name="star-o" size={24} color="black" />
                            </View>
                            <View style={styles.rankText}>
                                <Text style={styles.rankTextTitle}>Points</Text>
                                <View style={{ flexDirection: 'row', marginTop: 4, alignItems: 'baseline' }}>
                                    <Text style={styles.rankTextNumber}>{points}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-sharp" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.pageTitle}>{title}</Text>
                        {title == 'Profile' ? (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <FontAwesome name="gear" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.hidden} />
                        )}

                    </View>

                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#5E55D7',
        paddingBottom: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileIcon: {
        backgroundColor: '#4A42B2',
        width: 53,
        height: 53,
        borderRadius: 53 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileIconText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 21,
    },
    greetingText: {
        fontSize: 13,
        color: '#FFFFFF',
        textTransform: 'uppercase',
        fontWeight: '500',
        marginLeft: 8,
    },
    nameText: {
        color: '#FFFFFF',
        marginTop: 10,
        fontSize: 24,
    },
    pageTitle: {
        color: '#FFFFFF',
        fontSize: 24,
    },
    playerInfo: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rank: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rankIcon: {
        backgroundColor: '#FAF9FF',
        padding: 10,
        borderRadius: 4
    },
    rankText: {
        marginLeft: 10
    },
    rankTextTitle: {
        fontSize: 12,
        color: '#8E8D90'
    },
    rankTextNumber: {
        fontSize: 18,
        color: '#6A5AE0',
        fontWeight: '500',
    },
    rankTextNumberSecondary: {
        color: '#C9C9C9',
        fontSize: 14,
        fontWeight: '500'
    },
    rankTextNumberDivider: {
        color: '#C9C9C9',
        fontSize: 14,
        fontWeight: '500',
    },
    verticalDivider: {
        height: '100%',
        width: 1,
        backgroundColor: '#EFEFEF',
        marginHorizontal: 40
    },
    hidden: {
        width: 24,
    },
})

export default Header;