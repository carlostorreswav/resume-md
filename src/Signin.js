// Import FirebaseAuth and firebase.
import React, { useContext, useEffect, useState } from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { FirebaseContext } from "./FirebaseContext"
import { auth } from "./FirebaseContext"
// import firebase from "firebase/compat/app"
// import "firebase/compat/auth"
// import "firebase/compat/firestore"

// const config = {
//   apiKey: "AIzaSyBhVNVGkPJztQoRhAn1vWWRVbYom2gVXBo",
//   authDomain: "resumemd-2c280.firebaseapp.com",
//   projectId: "resumemd-2c280",
//   storageBucket: "resumemd-2c280.appspot.com",
//   messagingSenderId: "337532672383",
//   appId: "1:337532672383:web:718886edf77c8a1691224a",
// }

// export const app = firebase.initializeApp(config)
// export const auth = app.auth()
// export const db = app.firestore()

const Signin = () => {
  const { ctx } = useContext(FirebaseContext)
  // const [uiConfig, setUiConfig] = useState()

  // useEffect(() => {
  //   // const auth = ctx.app.auth()
  //   setUiConfig({
  //     signInFlow: "popup",
  //     signInSuccessUrl: "/",
  //     signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
  //   })
  // }, [ctx.auth])

  useEffect(() => {
    console.log("ctx", ctx)
  }, [ctx.auth])

  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     setUser(JSON.parse(localStorage.getItem("user")))
  //   }
  // }, [])

  const getUiConfig = auth => {
    return {
      signInFlow: "popup",
      signInSuccessUrl: "/",
      signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
    }
  }

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
  }

  return (
    <>
      {ctx.user ? (
        <>
          <h2>{ctx.user.displayName}</h2>
          <img src={ctx.user.photoURL} alt={ctx.user.displayName} />
          <button onClick={() => ctx.auth.signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </>
      )}
    </>
  )
}

export default Signin
