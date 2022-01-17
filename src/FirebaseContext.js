import React, { useState } from "react";
import {firebaseHandler} from './Firebase'
export const FirebaseContext = React.createContext({});

export const FirebaseProvider = ({ children }) => {

    const [fire, setFire] = useState({
        fireAuth:null, fireDb:null, fireFs:null, FsReady:false, AuthReady:false, DbReady:false})

    const AuthStart = async () => {
        return new Promise((resolve, reject) => {
            if (!fire.AuthReady) {
            import('firebase/auth').then(() => {
                const myAuth = firebaseHandler.auth()
                setFire((prev) => ({...prev, fireAuth: myAuth, AuthReady: true}))
                resolve(myAuth)
            }).catch((err) => {resolve(false)})
        } else {
            resolve(fire.fireAuth)
        }
        })
    }

    const DbStart = async () => {
        return new Promise((resolve, reject) => {
        if (!fire.DbReady) {
            import('firebase/firestore').then(() => {
                const myDb = firebaseHandler.firestore()
                setFire((prev) => ({...prev, fireDb: myDb, DbReady: true}))
                resolve(myDb)
            }).catch((err) => {resolve(false)})
        } else {
            resolve(fire.fireDb)
        }
    })
    }

    const FsStart = async () => {
        return new Promise((resolve, reject) => {
            if (!fire.FsReady) {
                import('firebase/storage').then(() => {
                    const myFs = firebaseHandler.storage()
                    setFire((prev) => ({...prev, fireFs: myFs, FsReady:true}))
                    resolve(myFs)
                }).catch((err) => {resolve(false)})
            } else {
                resolve(fire.fireFs)
            }
        })
    }

  return (
    <FirebaseContext.Provider value={{fire, setFire, AuthStart, DbStart, FsStart}}>
      {children}
    </FirebaseContext.Provider>
  );
};