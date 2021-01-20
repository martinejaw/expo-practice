import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Provider, useSelector, useDispatch } from 'react-redux'
import { setLogueado } from './store/index'
import { store } from './store'

import fb from './database/firebase'

import CreateUser from "./screens/CreateUser";
import UsersList from "./screens/UsersList";
import UserDetailScreen from "./screens/UserDetailScreen";
import Galeria from "./screens/Galeria";
import LoginScreen from "./screens/LoginScreen";
import Loading from "./screens/Loading";
import Modal from "./screens/Modal";
import SignIn from "./screens/sesion/SingIn";
import Recetas from "./screens/recetas/ListaRecetas"

const Stack = createStackNavigator()

function MyStack() {

  const logueado = useSelector(state => state.logueado)
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setLogueado(true))
        setLoading(false)
      } else {
        setLoading(false)
      }
    });
  });


  if (isLoading) return (
    <Loading />
  )

  return (
    <Stack.Navigator>
      {
        logueado ?
          <>
            <Stack.Screen name="Recetas" component={Recetas} options={{ title: 'Recetas', headerShown: false }} />


            <Stack.Screen name="Loading" component={Loading} options={{ title: 'Loading', headerShown: false }} />

            <Stack.Screen name="UsersList" component={UsersList} options={{ title: 'Users List' }} />
            <Stack.Screen name="CreateUser" component={CreateUser} options={{ title: 'Create New User' }} />
            <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ title: 'User Detail' }} />
            <Stack.Screen name="Galeria" component={Galeria} options={{ title: 'Compartir Foto', headerShown: false }} />

            <Stack.Screen name="Modal" component={Modal} options={{ title: 'Modal', headerShown: false, animationTypeForReplace: 'pop' }} />

            <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'SignIn', headerShown: false }} />
          </>
          :
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login', headerShown: false }} />

      }
    </Stack.Navigator>
  )
}

export default function App() {


  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
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
