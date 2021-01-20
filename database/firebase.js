import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth'
import cfg from '../cfg'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()

//auth.createUserWithEmailAndPassword('martinejaw@outlook.com', '12345678').then(user => {console.log(user)})

//auth.signInWithEmailAndPassword('martinejaw@outlook.com', '12345678').then(user => {console.log(user);})

//auth.signOut().then((f) => console.log(f)) 

//auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(e => console.log('XD')).catch(e => console.log(e))

// Se ejecuta cada vez que cambia algo en auth
// auth.onAuthStateChanged(user => {
//     if (user) {
//         console.log('Auth: Sesion iniciada')
//     } else {
//         console.log('Auth: No estoy logueado :(')
//     }
// })

export default {
    firebase,
    db,
    auth
}