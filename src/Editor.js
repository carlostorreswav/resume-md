import styled from "styled-components"
import MDEditor from '@uiw/react-md-editor';
import { useState } from "react"

const MainDiv = styled.div`
  margin: 0px;
  padding: 0px;
  color:black;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const MainWrapper = styled.div`
  height: 97%;
  width: 95%;
`

const Editor = () => {
  const [value, setValue] = useState("**Hello world!!!**");
  return <MainDiv>
    <MainWrapper>
      <MDEditor
        style={{ width: "100%" }}
        height={"100%"}
        value={value}
        onChange={setValue}
      />
    </MainWrapper>
      {/* <MDEditor.Markdown source={value} /> */}
  </MainDiv>
}

export default Editor