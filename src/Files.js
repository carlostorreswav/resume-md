import { useContext, useEffect, useState } from "react"
import { FirebaseContext } from "./FirebaseContext"
import { AppContext } from "./AppContext"
import { Button, CustomHr } from "./Components"
import styled from "styled-components"

const FilesMain = styled.div`
  width: 100%;
`

const NameCard = styled.div`
  /* border: 1px solid grey; */
  display: flex;
  justify-content: center;
  align-items: center;
`

const NameTitle = styled.div`
  font-weight: bold;
  cursor: pointer;
  min-width: 200px;
`

const ListTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 8px;
  text-align: center;
`

const Files = () => {
  const { ctx } = useContext(FirebaseContext)
  const [resumes, setResumes] = useState([])
  const { app, setApp } = useContext(AppContext)

  useEffect(() => {
    ctx.db &&
      ctx.db.collection("resumesIndex").onSnapshot(snapshot => {
        const resumes = snapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }))
        const userResumesIndex = resumes.filter(resume => resume.data.owner === ctx.user.uid)
        setResumes(userResumesIndex)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.db])

  const selectResume = resume => {
    console.log("selectResume", resume)
    ctx.db
      .collection("resumes")
      .doc(resume.data.indexID)
      .get()
      .then(doc => {
        console.log("doc", doc.data())
        setApp({ ...app, md: doc.data().md, title: doc.data().title })
      })
  }

  const deleteProc = resume => {
    ctx.db.collection("resumesIndex").doc(resume.id).delete()
    ctx.db.collection("resumes").doc(resume.data.indexID).delete()
  }

  const viewSite = resume => {
    window.location.href = resume.data.title
  }

  const copyLink = resume => {
    console.log("viewSite", resume)
    const copyText = document.createElement("textarea")
    copyText.value = "https://resume-md.vercel.app/" + resume.data.title
    document.body.appendChild(copyText)
    copyText.select()
    document.execCommand("copy")
    document.body.removeChild(copyText)
  }

  return (
    <FilesMain>
      <ListTitle>
        {resumes?.length > 0 ? "Resume List" : ctx.user ? "No Resumes" : "Sign in to start"}
      </ListTitle>
      {resumes?.length > 0 &&
        resumes.map(resume => (
          <NameCard key={resume.id}>
            <NameTitle onClick={() => selectResume(resume)}>{resume.data.title}</NameTitle>
            <Button onClick={() => selectResume(resume)}>Edit</Button>
            <Button onClick={() => deleteProc(resume)}>Delete</Button>
            <Button>
              <a href={`https://resume-md.vercel.app/${resume.data.title}`} target="_blank">
                Preview Site
              </a>
            </Button>
            <Button onClick={() => copyLink(resume)}>Copy Link</Button>
          </NameCard>
        ))}
      <CustomHr />
    </FilesMain>
  )
}

export default Files
