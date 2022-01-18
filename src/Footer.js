import { useContext, useEffect } from "react"
import styled from "styled-components"
import { AppContext } from "./AppContext"

const HeaderMain = styled.div`
  /* height: 100%; */
  height: ${p => (p.touched === true ? "0px" : "30px")};
  background-color: white;
  color: rgb(55, 53, 47);
  transition: height 0.5s ease-in-out;
  overflow: hidden;
  font-size: 0.8rem;
`

const MainTitle = styled.div`
  padding-top: 10px;
  text-align: center;
  font-weight: bold;
  font-weight: 700;
`

const SubTitle = styled.div`
  text-align: center;
  font-weight: normal;
  margin-top: -10px;
`

const Footer = () => {
  const { app } = useContext(AppContext)

  return (
    <HeaderMain touched={app.touched}>
      <SubTitle>
        <p>This is an open source project made by Carlos Torres</p>
      </SubTitle>
    </HeaderMain>
  )
}

export default Footer
