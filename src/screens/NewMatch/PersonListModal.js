import React from 'react';
import { StyleSheet, View, Text, FlatList, Modal, TouchableOpacity, Image, Button } from 'react-native';
import { useData } from '../../../DataContext';

const PersonListModal = ({ visible, onSelectPerson, onClose, persons, filterId }) => {
    // Filter out the selected player
    const filteredPersons = persons.filter(person => person.id !== filterId);
    const { getFirstLetter } = useData()

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onSelectPerson(item.id)}>
            {item.photo ? (
                <Image source={{ uri: item.photo }} style={styles.itemImage} />
            ) : (
                <View style={styles.itemImagePlaceholder}>
                    <Text style={{ fontSize: 22, color: 'white', fontWeight: '500' }}>{getFirstLetter(item.fullname)}</Text>
                </View>
            )}
            <Text style={styles.itemText}>{item.fullname}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <FlatList
                        data={filteredPersons}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                    <Button title="Close" onPress={onClose} />
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
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    itemImagePlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#5E55D7',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemText: {
        fontSize: 16,
    },
});

export default PersonListModal;