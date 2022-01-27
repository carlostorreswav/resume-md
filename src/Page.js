import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { useContext, useState } from "react"
import { FirebaseContext } from "./FirebaseContext"
import MDEditor from "@uiw/react-md-editor"
import styled, { keyframes } from "styled-components"
import { Button } from "./Components"

const LoadingAnimation = keyframes`
  0% {
    width: 0%;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.19);
  }
  99% {
    width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  100% {
    width: auto;
  }
`

const ShowAnimation = keyframes`
  0% {
    max-height: 0px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  100% {
    max-height: 3000px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
  }
`

const ButtonAnimation = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

const MainDiv = styled.div`
  overflow: hidden;
  margin: 4% auto;
  padding: 80px;
  max-width: 1000px;
  animation: ${p => (p.loading ? LoadingAnimation : ShowAnimation)} 0.8s ease-in-out;
  background-color: white;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
  @media (max-width: 1100px) {
    margin: 0 auto;
    padding: 4%;
    box-shadow: none;
  }
  transition: margin 0.3s ease-in-out, padding 0.3s ease-in-out, box-shadow 1s ease-in-out;
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 40px;
  @media (max-width: 1100px) {
    margin-top: 40px;
  }
  animation: ${ButtonAnimation} 2s ease-in-out forwards;
`

const Page = () => {
  let { id } = useParams()
  const [resume, setResume] = useState({ loading: true, data: "", error: false })
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
              error: !resume.data && true,
            }))
          } else {
            setResume(prev => ({
              ...prev,
              loading: false,
              data: "**PAGE NOT FOUND**",
              error: true,
            }))
          }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.db])

  const printResume = () => {
    const printButton = document.getElementById("printButton")
    const printMainDiv = document.getElementById("printMainDiv")
    printButton.style.display = "none"
    // MainDivRef.current.style.boxShadow = "none"
    printMainDiv.style.boxShadow = "none"
    window.print()
    printButton.style.display = "block"
    MainDivRef.current.style.boxShadow =
      "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19)"
  }

  const MainDivRef = useRef(null)

  return (
    <>
      <MainDiv loading={resume.loading} ref={MainDivRef} id="printMainDiv">
        <MDEditor.Markdown source={resume.data} />
      </MainDiv>
      {!resume.loading && !resume.error && (
        <ButtonDiv>
          <Button
            id="printButton"
            onClick={() => printResume()}
            margin="0px"
            padding="16px 32px"
            fontSize="16px"
            fontWeight="bold"
          >
            PRINT RESUME
          </Button>
        </ButtonDiv>
      )}
    </>
  )
}

export default Page
