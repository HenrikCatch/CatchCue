import { Image, StyleSheet, Text, View } from "react-native"
import Header from "../../components/Header/Header";
import { useAuth } from "../../../AuthContext";
import { useData } from "../../../DataContext";
import AntDesign from '@expo/vector-icons/AntDesign';


const ProfileScreen = () => {
    const { identity } = useAuth();
    const { getFirstLetter, points } = useData();

    return (
        <View style={styles.container}>
            <Header title="Profile" />

            <View style={styles.content}>
                <View style={styles.profileIcon}>
                    {identity.avatar ? (
                        <Image source={{ uri: identity.avatar }} style={styles.profilePicture} />
                    ) : (
                        <Text style={styles.profileIconText}>{getFirstLetter(identity?.fullName)}</Text>
                    )}
                </View>

                <View style={styles.mainContent}>
                    <Text style={styles.name}>{identity.fullName}</Text>
                    <Text style={styles.points}>{points} points</Text>
                </View>

                <View style={styles.info}>
                    <View style={[styles.infoBox, { paddingLeft: 10 }]}>
                        <AntDesign name="star" size={24} color="white" />
                        <Text style={styles.infoBoxHeading}>Points</Text>
                        <Text style={styles.infoBoxText}>560</Text>
                    </View>
                    <View style={styles.infoDivider} />
                    <View style={[styles.infoBox, {}]}>
                        <AntDesign name="star" size={24} color="white" />
                        <Text style={styles.infoBoxHeading}>Points</Text>
                        <Text style={styles.infoBoxText}>560</Text>
                    </View>
                    <View style={styles.infoDivider} />
                    <View style={[styles.infoBox, { paddingRight: 10 }]}>
                        <AntDesign name="star" size={24} color="white" />
                        <Text style={styles.infoBoxHeading}>Points</Text>
                        <Text style={styles.infoBoxText}>560</Text>
                    </View>
                </View>

                <View style={styles.settingBox}>
                    <View style={styles.settingItem}>

                    </View>
                </View>
            </View>
        </View>
    );
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
        height: '100%',
        marginTop: 40,
        position: 'relative'
    },
    profileIcon: {
        width: 93,
        height: 93,
        backgroundColor: '#38318E',
        borderRadius: 93 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -93 / 2,
        left: '50%',
        transform: [{ translateX: -16.5 }],
    },
    profileIconText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 35,
    },
    profilePicture: {
        width: '90%',
        height: '90%',
        borderRadius: 50,
    },
    mainContent: {
        marginTop: 35
    },
    name: {
        fontSize: 19,
        fontWeight: '500',
        textAlign: 'center',
        color: '#0E0D25'
    },
    points: {
        fontSize: 15,
        fontWeight: '300',
        textAlign: 'center',
        color: '#858493',
        marginTop: 5
    },
    info: {
        backgroundColor: '#5E55D7',
        borderRadius: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginTop: 20
    },
    infoBox: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    infoDivider: {
        height: '100%',
        width: 1,
        backgroundColor: '#837CE8'
    },
    infoBoxHeading: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white',
        marginVertical: 5
    },
    infoBoxText: {
        fontSize: 13,
        fontWeight: '600',
        color: 'white'
    }
});

export default ProfileScreen;