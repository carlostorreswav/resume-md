import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useContext, useRef, useState } from "react"
import { FirebaseContext } from "./FirebaseContext"
import MDEditor from "@uiw/react-md-editor"

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
          }
        })
  }, [ctx.db])

  return (
    <>
      {resume.loading === true ? <h1>Loading...</h1> : <MDEditor.Markdown source={resume.data} />}
    </>
  )
}

export default Page
