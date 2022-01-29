import Editor from "../Modules/Editor"
import FileSelector from "../Modules/FileSelector"
import styled from "styled-components"
import Header from "../Layout/Header"
import Footer from "../Layout/Footer"
import Profile from "../Layout/Profile"

const MainGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto auto 1fr auto;
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

const Home = () => {
  return (
    <MainGrid>
      <Header />
      <Profile />
      <GridRow>
        <FileSelector />
      </GridRow>
      <GridEditor>
        <Editor />
      </GridEditor>
      <Footer />
    </MainGrid>
  )
}

export default Home
