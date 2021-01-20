import React, { useState } from 'react'
import { View, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import firebase from '../database/firebase'


const CreateUser = (props) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const handleChangeInput = (field, value) => {
        setState({ ...state, [field]: value })
    }

    const saveNewUser = async () => {
        if (state.name === '') {
            alert('Please enter name')
        } else {
            try {
                await firebase.db.collection('users').add({
                    name: state.name,
                    email: state.email,
                    phone: state.phone
                })
                alert('User saved')
                props.navigation.navigate('UsersList')
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name" onChangeText={(value) => handleChangeInput('name', value)} />
            </View>
            <View style={styles.inputGroup}>

                <TextInput placeholder="Email" onChangeText={(value) => handleChangeInput('email', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone" onChangeText={(value) => handleChangeInput('phone', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Password" secureTextEntry/>
            </View>
            <View>
                <Button title="Save User" onPress={saveNewUser} />
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

export default CreateUser
