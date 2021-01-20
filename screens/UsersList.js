import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Button } from "react-native";
import { set } from 'react-native-reanimated';
import firebase from '../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'

const UsersList = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {

            const users = []
            querySnapshot.docs.forEach(doc => {
                const { name, email, phone } = doc.data()
                users.push({
                    id: doc.id, name, email, phone
                })
            })
            setUsers(users)
        })
    }, [])

    return (
        <ScrollView>
            <Button title="Galeria" onPress={() => props.navigation.navigate('Galeria')} />
            <Button title="Create User" onPress={() => props.navigation.navigate('CreateUser')} />
            {
                users.map(user => {
                    return (
                        <ListItem key={user.id} bottomDivider onPress={() => props.navigation.navigate('UserDetailScreen', { userId: user.id })}>
                            <ListItem.Chevron />
                            <Avatar
                                rounded
                                icon={{ name: 'user', type: 'font-awesome' }}
                            />
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email} </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
            <Button
                onPress={() => props.navigation.navigate('Modal')}
                title="Open Modal"
            />
        </ScrollView>
    )
}

export default UsersList
