import React, { createContext, useState } from "react"

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [app, setApp] = useState({ md: "HelloWorld", title: "" })
  return <AppContext.Provider value={{ app, setApp }}>{children}</AppContext.Provider>
}
