import React, { useState } from "react"

export const FirebaseContext = React.createContext({})

export const FirebaseProvider = ({ children }) => {
  const [ctx, setCtx] = useState("hello")
  return <FirebaseContext.Provider value={(ctx, setCtx)}>{children}</FirebaseContext.Provider>
}
