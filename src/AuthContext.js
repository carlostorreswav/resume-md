import React, { createContext, useContext, useEffect, useState } from 'react'
// import { fireAuth, fireDb } from '../services/firebase'
import { FirebaseContext } from './FirebaseContext'
import { getAuth } from "firebase/auth";
export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : {}
  )

  const Fire = useContext(FirebaseContext)

  const AuthProc = async () => {
    const fireAuth = await getAuth()
    fireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        let [displayName, email, photoURL, uid] = [
          user.displayName,
          user.email,
          user.photoURL,
          user.uid,
        ]
        //First check DDBB
        if (!sessionStorage.getItem('user')) {
          const fireDb = await Fire.DbStart()
          fireDb
            .collection('users')
            .doc(user.uid)
            .get()
            .then((res) => {
              if (res.exists) {
                displayName = res.data().displayName
                photoURL = res.data().photoURL
              } else {
                fireDb.collection('users').doc(user.uid).set({
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                })
              }
              setUser({ uid, email, displayName, photoURL })
              sessionStorage.setItem('user', JSON.stringify({ uid, email, displayName, photoURL }))
            })
        }
      } else {
        setUser({})
        sessionStorage.removeItem('user')
      }
    })
  }

  useEffect(() => {
    AuthProc()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}
