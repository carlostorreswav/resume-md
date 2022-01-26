import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { useContext, useState } from "react"
import { FirebaseContext } from "./FirebaseContext"
import MDEditor from "@uiw/react-md-editor"
import styled, { keyframes } from "styled-components"
import { Button } from "./Components"

const LoadingMain = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoadingAnimation = keyframes`
  0% {
    width: 0%;
    height: 40%;
  }
  50% {
    width: 100%;
    height: 40%;
  }
  99% {
    width: 100%;
    height: 82%;
  }
  100% {
    width: auto;
    height: auto;
  }
`

// const BrandAnimation = keyframes`
//   0% {
//     border-radius: 0px;
//   }
//   100% {
//     border-radius: 20px;
//   }
// `

const LoadingTrans = styled.div`
  margin: 2% auto;
  padding: 4%;
  max-width: 1000px;
  /* height: 82%; */
  /* width: 1000px; */
  animation: ${LoadingAnimation} 0.6s ease-in-out forwards;
  /* border: 1px solid #ccc; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MainDiv = styled.div`
  margin: 4% auto;
  padding: 80px;
  max-width: 1000px;
  /* border: 1px solid #ccc; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: ${LoadingAnimation} 0.3s ease-in-out forwards;
  background-color: white;
  @media (max-width: 1100px) {
    margin: 0 auto;
    padding: 4%;
  }
  transition: margin 0.3s ease-in-out, padding 0.3s ease-in-out;
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -40px;
`

// const BrandDiv = styled.div`
//   padding: 16px 32px;
//   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
//   background-color: white;
//   animation: ${BrandAnimation} 0.5s ease-in-out forwards;
// `

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
    MainDivRef.current.style.boxShadow = "none"
    window.print()
    printButton.style.display = "block"
    MainDivRef.current.style.boxShadow =
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
  }

  const MainDivRef = useRef(null)

  return (
    <>
      {resume.loading === true ? (
        <LoadingMain>
          <LoadingTrans>
            {/* <BrandDiv>
              <h1>
                <strong>RESUME.MD</strong>
              </h1>
            </BrandDiv> */}
          </LoadingTrans>
        </LoadingMain>
      ) : (
        <>
          <MainDiv ref={MainDivRef}>
            <MDEditor.Markdown source={resume.data} />
          </MainDiv>
          {resume.data !== "**PAGE NOT FOUND**" && (
            <ButtonDiv>
              <Button
                id="printButton"
                onClick={() => printResume()}
                margin="40px"
                padding="16px 32px"
                fontSize="16px"
                fontWeight="bold"
              >
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
