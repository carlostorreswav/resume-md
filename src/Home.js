import Editor from "./Editor"
import Files from "./Files"
import Signin from "./Signin"
import styled from "styled-components"

const MainGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: minmax(100px, auto) minmax(100px, auto) 1fr;
`

const GridElm = styled.div`
  min-width: 200px;
`

const GridRow = styled.div`
  display: flex;
  background-color: pink;
`

const GridEditor = styled.div`
  background-color: #f0f340;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GridHeader = styled.div``

const Home = () => {
  return (
    <MainGrid>
      <GridHeader>RESUME MD</GridHeader>
      <GridRow>
        <GridElm>
          <Signin />
        </GridElm>
        <GridElm>
          <Files />
        </GridElm>
      </GridRow>
      <GridEditor>
        <Editor />
      </GridEditor>
    </MainGrid>
  )
}

export default Home
