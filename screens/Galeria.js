import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToInternet from 'anonymous-files';
import Camara from './Camara'

export default function App() {

  const [state, setState] = useState(null)

  const abrirGaleria = async () => {
    const permisos = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permisos.granted) {
      Alert.alert('Permisos')
      return;
    }
    const imagen = await ImagePicker.launchImageLibraryAsync()

    if (imagen.cancelled) {
      return;
    }

    if (Platform.OS === 'web') {
      const url = await uploadToInternet(imagen.uri)
      console.log(url)
      setState({ localUri: url })
    } else {
      setState({ localUri: imagen.uri })

    }

  }

  const compartir = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert('La imagen esta en '+state.localUri)
      return;
    }

    await Sharing.shareAsync(state.localUri);

  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity onPress={abrirGaleria}>
        <Image source={{ uri: state !== null ? state.localUri : 'https://picsum.photos/200' }} style={styles.image} />
      </TouchableOpacity>
      <Button title="Compartir" color="red" onPress={compartir} />
      <Camara />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain'
  }
});
