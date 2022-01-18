import React, { createContext, useEffect, useState } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

const config = {
  apiKey: "AIzaSyBhVNVGkPJztQoRhAn1vWWRVbYom2gVXBo",
  authDomain: "resumemd-2c280.firebaseapp.com",
  projectId: "resumemd-2c280",
  storageBucket: "resumemd-2c280.appspot.com",
  messagingSenderId: "337532672383",
  appId: "1:337532672383:web:718886edf77c8a1691224a",
}

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
}

const app = firebase.initializeApp(config)
const auth = app.auth()
const db = app.firestore()

export const FirebaseContext = createContext({})

export const FirebaseProvider = ({ children }) => {
  const [ctx, setCtx] = useState({})

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setCtx(prev => ({ ...prev, user }))
        localStorage.setItem("user", JSON.stringify(user))
      } else {
        setCtx(prev => ({ ...prev, user: null }))
        localStorage.removeItem("user")
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setCtx(ctx => ({
      ...ctx,
      app,
      auth,
      db,
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
      signin: () => <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser])

  return <FirebaseContext.Provider value={{ ctx, setCtx }}>{children}</FirebaseContext.Provider>
}
