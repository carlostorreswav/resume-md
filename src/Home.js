import Editor from "./Editor"
import Files from "./Files"
import Firebase from "./Firebase"

const Home = () => {
  return (
    <>
      <Firebase />
      <Files />
      <Editor />
    </>
  )
}

export default Home
