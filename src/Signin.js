import React, { useContext } from "react"
import { FirebaseContext } from "./FirebaseContext"
import styled from "styled-components"

const MainDiv = styled.div``

const Signin = () => {
  const { ctx } = useContext(FirebaseContext)
  console.log("ctx", ctx)
  return <MainDiv>{!ctx.user && <>{ctx.signin && ctx.signin()}</>}</MainDiv>
}

export default Signin
