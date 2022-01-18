// Import FirebaseAuth and firebase.
import React, { useContext } from "react"
import { FirebaseContext } from "./FirebaseContext"
import styled from "styled-components"
import { AppContext } from "./AppContext"
import { Button, CustomHr } from "./Components"

const ProfileMain = styled.div`
  /* position: absolute; */
  width: 100%;
  margin: 0 auto;
  /* padding-top: ${p => (p.touched === true ? "0px" : "120px")}; */
  transition: padding-top 0.3s ease-in-out;
  /* overflow: hidden; */
`

const ProfileDiv = styled.div`
  text-align: center;
  /* border: 1px solid grey; */
  padding: 10px;
  padding-top: 20px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
`

const ProfileDiv2 = styled.div`
  text-align: center;
  /* border: 1px solid grey; */
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
`

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`

const AbsResume = styled.div`
  float: right;
  margin-right: 20px;
  margin-top: 14px;
  transform: ${p => (p.touched ? "translateX(0px)" : "translateX(120%)")};
  transition: transform 0.5s ease-in-out;
  transition-delay: 0.6s;
`

const Profile = () => {
  const { ctx } = useContext(FirebaseContext)
  const { app } = useContext(AppContext)

  return (
    <ProfileMain touched={app.touched}>
      {ctx.user ? (
        <ProfileDiv>
          <ProfileImg src={ctx.user.photoURL} alt={ctx.user.displayName} />
          <br />
          <Button onClick={() => ctx.auth.signOut()}>Log out</Button>
        </ProfileDiv>
      ) : (
        <ProfileDiv2>{ctx.signin && ctx.signin()}</ProfileDiv2>
      )}
      <AbsResume touched={app.touched}>
        <h2>Resume.MD</h2>
      </AbsResume>
      <CustomHr />
    </ProfileMain>
  )
}

export default Profile
