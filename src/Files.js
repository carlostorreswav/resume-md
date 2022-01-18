import { useContext, useEffect, useState } from "react"
import { FirebaseContext } from "./FirebaseContext"
import { AppContext } from "./AppContext"

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

  return (
    <>
      {resumes?.length > 0 &&
        resumes.map(resume => (
          <div key={resume.id}>
            <h2 onClick={() => selectResume(resume)}>{resume.data.title}</h2>
            <button onClick={() => deleteProc(resume)}>DELETE</button>
          </div>
        ))}
    </>
  )
}

export default Files
