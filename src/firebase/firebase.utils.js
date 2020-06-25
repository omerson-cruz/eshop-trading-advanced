import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCrwgfM96cxddvN24agab5XZdiKjWFBHwI",
    authDomain: "eshop-trading.firebaseapp.com",
    databaseURL: "https://eshop-trading.firebaseio.com",
    projectId: "eshop-trading",
    storageBucket: "eshop-trading.appspot.com",
    messagingSenderId: "330010395179",
    appId: "1:330010395179:web:653b122c1c1a15139ea06e"
}

firebase.initializeApp(config)

// for Google authentication
export const auth = firebase.auth()  // from 'firebase/auth'
export const firestore = firebase.firestore() // from 'firebase/firestore'

// this is the Google Sign in Popup
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account'})  // this will popup the Google Authentication sign in
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase






