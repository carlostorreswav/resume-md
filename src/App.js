import Editor from "./Editor";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Page from "./Page";

const App = () => {
  return (
  <Router>
    <Routes>
      <Route exact path="/" element={<Editor/>}/>
      <Route exact path="/:id" element={<Page/>}/>
    </Routes>
  </Router>
  )
}

export default App