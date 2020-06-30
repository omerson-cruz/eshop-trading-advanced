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

export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if (!userAuth) return  // if we signed Out then exit from the function

    // userRef is the documentRef for users document
    // because userAuth knows and returns the "uid" too which is linked to Authentication of Google
    const userRef = firestore.doc(`/users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    console.log('snapShot: ', snapShot)

    if(!snapShot.exists) {  // if does not exist then we wanna create the user in the database
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            // we are now going to add the user
            await userRef.set({
                displayName,    // from googleAuth or Sign Up
                email,          // from googleAuth or Sign UP
                createdAt,      // from googleAuth or Sign Up
                ...additionalData   // from Sign Up
            })

        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    // let's return the userRef since it might be used for something else
    return userRef

}

firebase.initializeApp(config)

// for Google authentication and firestore
export const auth = firebase.auth()  // from 'firebase/auth'
export const firestore = firebase.firestore() // from 'firebase/firestore'

// this is the Google Sign in Popup
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account'})  // this will popup the Google Authentication sign in
export const signInWithGoogle = () => auth.signInWithPopup(provider)
/** End - Google Authentication API Popup */



export default firebase






