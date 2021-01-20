import React, { useState } from 'react'
import { View, Text, ScrollView, Button, TextInput, StyleSheet, Alert } from "react-native"
import firebase from '../database/firebase'
import { setLogueado } from '../store/index'
import { useDispatch } from 'react-redux'

const LoginScreen = () => {

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    firebase.auth.onAuthStateChanged(user => {
        if (user) {
            console.log('Auth: OK')
            dispatch(setLogueado(true))
        }
    })

    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder="Usuario" onChangeText={(text) => setUser(text)} />
            <TextInput style={styles.textInput} placeholder="Constrasena" secureTextEntry onChangeText={(text) => setPassword(text)} />
            <View style={styles.loginButtons}>
                <Button title="Iniciar Sesion"
                    onPress={() => firebase.auth.signInWithEmailAndPassword(user, password)
                        .catch(e => Alert.alert('Error'))} />
                <Button title="Iniciar con Google"
                    onPress={() => firebase.auth.signInWithPopup(new firebase.firebase.auth.GoogleAuthProvider()) // SOLO PARA PC ESTO
                        .catch(e => Alert.alert('Error'))} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60
    },
    textInput: {
        padding: 2,
        margin: 10,
        borderBottomWidth: 1
    },
    loginButtons: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        maxHeight: 100
    }
})

export default LoginScreen
