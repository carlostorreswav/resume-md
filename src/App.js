import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Page from "./Page";
import Home from "./Home";

const App = () => {
  return (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/:id" element={<Page/>}/>
    </Routes>
  </Router>
  )
}

export default App