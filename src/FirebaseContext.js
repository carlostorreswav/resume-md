import React, { createContext, useEffect, useState } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const config = {
  apiKey: "AIzaSyBhVNVGkPJztQoRhAn1vWWRVbYom2gVXBo",
  authDomain: "resumemd-2c280.firebaseapp.com",
  projectId: "resumemd-2c280",
  storageBucket: "resumemd-2c280.appspot.com",
  messagingSenderId: "337532672383",
  appId: "1:337532672383:web:718886edf77c8a1691224a",
}

export const FirebaseContext = createContext({})

const app = firebase.initializeApp(config)
const auth = app.auth()
const db = app.firestore()

export const FirebaseProvider = ({ children }) => {
  const [ctx, setCtx] = useState({})

  // useEffect(() => {
  //   setCtx({ app, auth, db, user: null })
  // }, [])

  const start = async () => {
    const app = await firebase.initializeApp(config)
    const auth = await app.auth()
    const db = await app.firestore()
    const user = await auth.currentUser
    setCtx({ app, auth, db, user })
  }

  useEffect(() => {
    start()
    // auth.onAuthStateChanged(user => {
    //   setCtx({ app, auth, db, user })
    // })
  }, [])

  return <FirebaseContext.Provider value={{ ctx, setCtx }}>{children}</FirebaseContext.Provider>
}
