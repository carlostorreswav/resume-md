import Editor from "./Editor"
import Files from "./Files"
import Signin from "./Signin"
import styled from "styled-components"
import Header from "./Header"
import Footer from "./Footer"
import Profile from "./Profile"

const MainGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto auto auto 1fr auto;
`

const GridElm = styled.div`
  min-width: 200px;
`

const GridRow = styled.div`
  display: flex;
  background-color: white;
`

const GridEditor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`

const GridHeader = styled.div``

const Home = () => {
  return (
    <MainGrid>
      <Header />
      <Profile />
      <GridRow>
        <Files />
      </GridRow>
      <GridEditor>
        <Editor />
      </GridEditor>
      <Footer />
    </MainGrid>
  )
}

export default Home
