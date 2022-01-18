import styled from "styled-components"
import MDEditor from "@uiw/react-md-editor"
import { useContext, useRef, useState } from "react"
import { FirebaseContext } from "./FirebaseContext"
import { AppContext } from "./AppContext"

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

const OptionDiv = styled.div``

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

  const hRef = useRef()

  return (
    <>
      <MainWrapper>
        <OptionDiv ref={hRef}>
          <input
            type="text"
            placeholder="Your custom endpoint"
            onChange={e => setApp(prev => ({ ...prev, title: e.target.value }))}
            value={app.title}
          ></input>
          <button onClick={() => saveProc()}>SAVE RESUME</button>
        </OptionDiv>

        <MDEditor
          style={{ width: "100%" }}
          // height={"100%"}
          height={`calc(100% - ${hRef?.current?.clientHeight || 40}px)`}
          value={app.md}
          onChange={e => setApp(prev => ({ ...prev, md: e }))}
        />
      </MainWrapper>
      {/* <MDEditor.Markdown source={value} /> */}
    </>
  )
}

export default Editor
