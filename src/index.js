import React, { Suspense, lazy } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ReactDOM from "react-dom"
import { createGlobalStyle } from "styled-components"
import { FirebaseProvider } from "./FirebaseContext"
import { AppProvider } from "./AppContext"

const Home = lazy(() => import("./Home"))
const Page = lazy(() => import("./Page"))

const GlobalStyle = createGlobalStyle`
  body {
    scroll-behavior: smooth;
    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0;
    overflow-y: scroll;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <FirebaseProvider>
      <AppProvider>
        <Router>
          <Suspense fallback={<></>}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/:id" element={<Page />} />
            </Routes>
          </Suspense>
        </Router>
      </AppProvider>
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
