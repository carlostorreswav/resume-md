import React, { createContext, useState } from "react"
import { defaultResume } from "./DefaultResume"

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [app, setApp] = useState({
    md: defaultResume,
    title: "",
    touched: false,
  })
  return <AppContext.Provider value={{ app, setApp }}>{children}</AppContext.Provider>
}
