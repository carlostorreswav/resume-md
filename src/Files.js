import { useEffect, useState } from "react"
import { auth, db } from "./Firebase"

const Files = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    console.log("useEffect")
    if (auth.currentUser) {
      console.log("currentUser")
      db.collection("files")
        .doc(auth.currentUser.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            setFiles(doc.data().files)
          } else {
            setFiles([])
            setLoading(false)
            setMsg("No files found.")
          }
        })
        .catch(error => {
          console.log("Error getting document:", error)
        })
    } else {
      setFiles([])
      setLoading(false)
      setMsg("Please sign in to view your files.")
    }
  }, [auth])

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {files.map(file => (
            <li key={file.id}>
              <a href={file.url}>{file.name}</a>
            </li>
          ))}
          {msg && <p>{msg}</p>}
        </ul>
      )}
    </>
  )
}

export default Files
