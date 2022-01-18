// Import FirebaseAuth and firebase.
import React, { useContext, useEffect, useState } from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { FirebaseContext } from "./FirebaseContext"
const Signin = () => {
  const { ctx } = useContext(FirebaseContext)
  console.log("ctx", ctx)
  return (
    <>
      {ctx.user ? (
        <>
          <h2>{ctx.user.displayName}</h2>
          <img src={ctx.user.photoURL} alt={ctx.user.displayName} />
          <button onClick={() => ctx.auth.signOut()}>Sign out</button>
        </>
      ) : (
        <>{ctx.signin && ctx.signin()}</>
      )}
    </>
  )
}

export default Signin
