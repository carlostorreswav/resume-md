import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { createGlobalStyle } from "styled-components"
import { FirebaseProvider } from "./FirebaseContext"
import { AppProvider } from "./AppContext"

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <FirebaseProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
