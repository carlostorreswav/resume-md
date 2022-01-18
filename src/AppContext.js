import React, { createContext, useState } from "react"
import { defResume } from "./DefResume"

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [app, setApp] = useState({
    md: defResume,
    title: "",
    touched: false,
  })
  return <AppContext.Provider value={{ app, setApp }}>{children}</AppContext.Provider>
}
