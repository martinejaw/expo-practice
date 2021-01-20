import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import firebase from '../database/firebase'

export default function LoadingScreen({ navigation }) {
    
    // useEffect(() => {
    //     firebase.auth.onAuthStateChanged((user) => {
    //         console.log(user)
    //         if (user) {
    //             navigation.replace('LoginScreen');
    //         } else {
    //             navigation.replace('UsersList');
    //         }
    //     });
    // });

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
