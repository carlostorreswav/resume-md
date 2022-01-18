// Import FirebaseAuth and firebase.
import React, { useContext, useEffect, useState } from "react"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { FirebaseContext } from "./FirebaseContext"
import styled from "styled-components"

const MainDiv = styled.div``

const Signin = () => {
  const { ctx } = useContext(FirebaseContext)
  console.log("ctx", ctx)
  return <MainDiv>{!ctx.user && <>{ctx.signin && ctx.signin()}</>}</MainDiv>
}

export default Signin
