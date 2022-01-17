import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { createGlobalStyle } from "styled-components"
// import { FirebaseProvider } from "./FirebaseContext"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fafafa;
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    {/* <FirebaseProvider> */}
    <App />
    {/* </FirebaseProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
)
