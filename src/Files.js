import { useContext, useEffect, useState } from "react"
import { FirebaseContext } from "./FirebaseContext"
import { AppContext } from "./AppContext"
import { Button, CustomA, CustomHr } from "./Components"
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
        const userResumesIndex = resumes.filter(resume => resume.data.owner === ctx?.user?.uid)
        setResumes(userResumesIndex)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.db])

  const selectResume = resume => {
    ctx.db
      .collection("resumes")
      .doc(resume.data.indexID)
      .get()
      .then(doc => {
        setApp({ ...app, md: doc.data().md, title: doc.data().title })
      })
  }

  const deleteProc = (resume, title) => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      ctx.db.collection("resumesIndex").doc(resume.id).delete()
      ctx.db.collection("resumes").doc(resume.data.indexID).delete()
    }
  }

  const copyLink = resume => {
    const copyText = document.createElement("textarea")
    copyText.value = "https://resume-md.vercel.app/" + resume.data.title
    document.body.appendChild(copyText)
    copyText.select()
    document.execCommand("copy")
    document.body.removeChild(copyText)
    setCopy(true)
  }

  const [copy, setCopy] = useState(false)

  useEffect(() => {
    copy === true && setTimeout(() => setCopy(false), 1000)
  }, [copy])

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
            <Button onClick={() => deleteProc(resume, resume.data.title)}>Delete</Button>
            <Button>
              <CustomA
                url={`https://resume-md.vercel.app/${resume.data.title}`}
                fontWeight="normal"
                color="#000"
                hoverColor="white"
                textDecoration="none"
              >
                Preview Site
              </CustomA>
            </Button>
            <Button onClick={() => copyLink(resume)}>{copy ? "Copied =D" : "Copy Link"}</Button>
          </NameCard>
        ))}
      <CustomHr />
    </FilesMain>
  )
}

export default Files
