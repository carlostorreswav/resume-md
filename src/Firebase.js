// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// Configure Firebase.
const config = {
  apiKey: "AIzaSyBhVNVGkPJztQoRhAn1vWWRVbYom2gVXBo",
  authDomain: "resumemd-2c280.firebaseapp.com",
  projectId: "resumemd-2c280",
  storageBucket: "resumemd-2c280.appspot.com",
  messagingSenderId: "337532672383",
  appId: "1:337532672383:web:718886edf77c8a1691224a",
}

export const app = firebase.initializeApp(config)
export const auth = app.auth()
export const db = app.firestore()

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
}

const Signin = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")))
    }
  }, [])

  auth.onAuthStateChanged(user => {
    console.log("user", user)
    if (user) {
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      setUser(null)
      localStorage.removeItem("user")
    }
  })

  return (
    <>
      {user ? (
        <>
          <h2>{user.displayName}</h2>
          <img src={user.photoURL} alt={user.displayName} />
          <button onClick={() => auth.signOut()}>Sign out</button>
        </>
      ) : (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      )}
    </>
  )
}

export default Signin
