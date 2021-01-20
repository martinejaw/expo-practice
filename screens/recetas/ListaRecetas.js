import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Button } from "react-native";
import firebase from '../../database/firebase'
import { ListItem, Avatar } from 'react-native-elements'
import Loading from '../Loading'

import { setLogueado } from '../../store/index'
import { useDispatch } from 'react-redux'



const Recetas = (props) => {

    const [recetas, setRecetas] = useState([])
    const [isLoading, setLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        
        firebase.db.collection('recetas').onSnapshot(querySnapshot => {

            const recetas = []
            querySnapshot.docs.forEach(doc => {
                const { ingredientes, Receta, title, description } = doc.data()
                recetas.push({
                    id: doc.id, ingredientes, Receta, title, description: description.substring(0, 50) + '...'
                })
            })
            setRecetas(recetas)
            setLoading(false)
        })
    }, [])

    if (isLoading) return (
        <Loading />
    )

    return (
        <ScrollView>
            {
                recetas.map(receta => {
                    return (
                        <ListItem key={receta.id} bottomDivider onPress={() => console.log(receta)}>
                            <ListItem.Chevron />
                            <Avatar
                                rounded
                                source={{ uri: 'https://img.freepik.com/vector-gratis/mujer-cocinera-cocinando-comida-perfil-avatar-icon_48369-15376.jpg?size=664&ext=jpg' }}
                            />
                            <ListItem.Content>
                                <ListItem.Title>{receta.title}</ListItem.Title>
                                <ListItem.Subtitle>{receta.description}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
            <Button title='LogOut' onPress={() => {firebase.auth.signOut(); dispatch(setLogueado(false))}} />

        </ScrollView>
    )
}

export default Recetas
