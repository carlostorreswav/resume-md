import { useContext } from "react"
// import { FirebaseContext } from "./BaseContext"
import { FirebaseContext } from "./BaseContext"

const Signin = () => {
  const ctx = useContext(FirebaseContext)
  return <>{JSON.stringify(ctx)}</>
}

export default Signin
