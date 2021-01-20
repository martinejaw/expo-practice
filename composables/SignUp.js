import fb from '../database/firebase'
import {Alert} from "react-native";

export async function registration(email, password) {
  try {
    await fb.auth.createUserWithEmailAndPassword(email, password);
    // const currentUser = firebase.auth().currentUser;
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password) {
  try {
   await fb
      .auth
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await fb.auth.signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}