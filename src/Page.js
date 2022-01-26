import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useContext, useState } from "react"
import { FirebaseContext } from "./FirebaseContext"
import MDEditor from "@uiw/react-md-editor"
import styled from "styled-components"
import { Button } from "./Components"

const LoadingMain = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MainDiv = styled.div`
  margin: 2% auto;
  padding: 4%;
  max-width: 1000px;
  /* border: 1px solid #ccc; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -40px;
`

const Page = () => {
  let { id } = useParams()
  const [resume, setResume] = useState({ loading: true, data: "" })
  const { ctx } = useContext(FirebaseContext)

  useEffect(() => {
    ctx.db &&
      ctx.db
        .collection("resumes")
        .get()
        .then(snapshot => {
          const resumes = snapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }))
          const resume = resumes.find(resume => resume.data.title === id)
          if (resume) {
            setResume(prev => ({
              ...prev,
              loading: false,
              data: resume.data ? resume.data.md : "**PAGE NOT FOUND**",
            }))
          } else {
            setResume(prev => ({ ...prev, loading: false, data: "**PAGE NOT FOUND**" }))
          }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.db])

  const printResume = () => {
    const printButton = document.getElementById("printButton")
    printButton.style.display = "none"
    window.print()
    printButton.style.display = "block"
  }

  return (
    <>
      {resume.loading === true ? (
        <LoadingMain>
          <h3>Loading resume...</h3>
        </LoadingMain>
      ) : (
        <>
          <MainDiv>
            <MDEditor.Markdown source={resume.data} />
          </MainDiv>
          {resume.data !== "**PAGE NOT FOUND**" && (
            <ButtonDiv>
              <Button style={{ margin: "20px" }} id="printButton" onClick={() => printResume()}>
                PRINT RESUME
              </Button>
            </ButtonDiv>
          )}
        </>
      )}
    </>
  )
}

export default Page
