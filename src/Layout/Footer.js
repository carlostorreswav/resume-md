import { useContext } from "react"
import styled from "styled-components"
import { AppContext } from "../Context/AppContext"
import { CustomA } from "../Modules/StyledComponents"

const HeaderMain = styled.div`
  height: 100%;
  background-color: white;
  color: rgb(55, 53, 47);
  transition: height 0.5s ease-in-out;
  overflow: hidden;
  font-size: 0.8rem;
`

const SubTitle = styled.div`
  text-align: center;
  font-weight: normal;
  margin-top: 30px;
`

const Footer = () => {
  const { app } = useContext(AppContext)

  return (
    <HeaderMain touched={app.touched}>
      <SubTitle>
        <p>
          This is an
          <CustomA
            url="https://github.com/carlostorreswav/resume-md"
            color="#111"
            hoverColor="darkred"
          >
            open source
          </CustomA>
          simple app made by
          <CustomA
            url="https://resume-md.vercel.app/carlostorres"
            color="#111"
            hoverColor="darkred"
          >
            Carlos Torres
          </CustomA>
          <br />
          <strong>Pull requests are welcome! 🙂</strong>
          <br />
        </p>
      </SubTitle>
    </HeaderMain>
  )
}

export default Footer
