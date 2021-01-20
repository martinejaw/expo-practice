import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';
import { View, TextInput, Button, ScrollView, StyleSheet, Alert } from "react-native";
import firebase from '../database/firebase'

const UserDetailScreen = (props) => {

    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        phone: ''
    })

    const [loading, setLoading] = useState(true)

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id)
        const doc = await dbRef.get()
        const user = doc.data()
        setUser({ ...user, id: doc.id })
        setLoading(false)
    }

    useEffect(() => {
        getUserById(props.route.params.userId)
    }, [])

    const handleChangeInput = (field, value) => {
        setUser({ ...user, [field]: value })
    }

    const updateUser = async () => {
        try {
            const dbRef = firebase.db.collection('users').doc(props.route.params.userId)
            await dbRef.set({
                name: user.name,
                email: user.email,
                phone: user.phone
            });
            props.navigation.navigate('UsersList')
        } catch (error) {
            console.log(error)
        }
    }

    const openConfirmationsAlert = () => {
        Alert.alert('Remove the user', 'Are you sure?', [
            { text: 'Yes', onPress: () => deleteUser() },
            { text: 'No', onPress: () => console.log('Cancel') }

        ])
    }

    const deleteUser = async () => {
        try {
            const dbRef = firebase.db.collection('users').doc(props.route.params.userId)
            await dbRef.delete();
            props.navigation.navigate('UsersList')
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name" value={user.name} onChangeText={(value) => handleChangeInput('name', value)} />
            </View>
            <View style={styles.inputGroup}>

                <TextInput placeholder="Email" value={user.email} onChangeText={(value) => handleChangeInput('email', value)} />
            </View>
            <View style={styles.inputGroup}>

                <TextInput placeholder="Phone" value={user.phone} onChangeText={(value) => handleChangeInput('phone', value)} />
            </View>
            <View>
                <Button color="green" title="Update User" onPress={updateUser} />
                <Button color="red" title="Delete User" onPress={openConfirmationsAlert} />

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export default UserDetailScreen
