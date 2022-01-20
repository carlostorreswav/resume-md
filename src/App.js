import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import Page from "./Page"
// import Home from "./Home"
import { Suspense, lazy } from "react"

const Home = lazy(() => import("./Home"))
const Page = lazy(() => import("./Page"))

const App = () => {
  return (
    <Router>
      <Suspense fallback={<></>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/:id" element={<Page />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
