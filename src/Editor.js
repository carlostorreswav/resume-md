import styled from "styled-components"
import MDEditor from "@uiw/react-md-editor"
import { useContext, useRef, useState } from "react"
import { FirebaseContext } from "./FirebaseContext"
import { AppContext } from "./AppContext"
import { Button } from "./Components"

const MainDiv = styled.div`
  margin: 0px;
  padding: 0px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const MainWrapper = styled.div`
  height: 98%;
  width: 98%;
`

const OptionDiv = styled.div`
  text-align: center;
`

const CustomInput = styled.input`
  min-width: 200px;
  height: 18px;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
`

const Editor = () => {
  const { app, setApp } = useContext(AppContext)
  const { ctx } = useContext(FirebaseContext)

  const saveProc = () => {
    ctx.db
      .collection("resumesIndex")
      .get()
      .then(snapshot => {
        const resumes = snapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }))
        console.log("resumes", resumes)
        const resume = resumes.find(resume => resume.data.title === app.title)
        if (resume) {
          console.log("hay resume con este título")
          if (resume.data.owner === ctx.user.uid) {
            ctx.db
              .collection("resumes")
              .doc(resume.data.indexID)
              .update({ md: app.md })
              .then(() => alert("RESUME UPDATED"))
          } else {
            alert("ENDPOINT ALREADY EXISTS")
          }
        } else {
          ctx.db
            .collection("resumes")
            .add({
              title: app.title,
              md: app.md,
              owner: ctx.user.uid,
            })
            .then(docRef =>
              ctx.db.collection("resumesIndex").add({
                title: app.title,
                owner: ctx.user.uid,
                indexID: docRef.id,
              })
            )
        }
      })
  }

  const saveProcLander = () => {
    if (!ctx.user) {
      alert("Login to Save your Resume")
    } else {
      saveProc()
    }
  }

  const hRef = useRef()

  return (
    <>
      <MainWrapper>
        <OptionDiv ref={hRef}>
          <CustomInput
            type="text"
            placeholder="Your custom endpoint"
            onChange={e => setApp(prev => ({ ...prev, title: e.target.value }))}
            value={app.title}
          ></CustomInput>
          <Button onClick={() => saveProcLander()}>SAVE RESUME</Button>
        </OptionDiv>

        <MDEditor
          style={{ width: "100%" }}
          // height={"100%"}
          height={`calc(100% - ${hRef?.current?.clientHeight || 40}px)`}
          value={app.md}
          onChange={e => setApp(prev => ({ ...prev, md: e, touched: true }))}
        />
      </MainWrapper>
      {/* <MDEditor.Markdown source={value} /> */}
    </>
  )
}

export default Editor
