import { useContext } from "react"
import styled from "styled-components"
import { AppContext } from "../Context/AppContext"
import { CustomA } from "../Modules/StyledComponents"

const HeaderMain = styled.div`
  height: ${p => (p.touched === true ? "0px" : "120px")};
  background-color: white;
  color: rgb(55, 53, 47);
  transition: height 0.5s ease-in-out;
  overflow: hidden;
`

const MainWrapper = styled.div`
  transform: ${p => (p.touched ? "translateY(-120px)" : "translateY(0)")};
  transition: transform 0.5s ease-in-out;
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
  padding-bottom: 10px;
`

const Header = () => {
  const { app } = useContext(AppContext)

  return (
    <HeaderMain touched={app.touched}>
      <MainWrapper touched={app.touched}>
        <MainTitle>
          <h1>
            <CustomA
              color="rgb(55, 53, 47);"
              hoverColor="darkred"
              url="https://github.com/carlostorreswav/resume-md"
            >
              Resume.MD
            </CustomA>
          </h1>
        </MainTitle>
        <SubTitle>
          <p>Share your markdown resume free and stupidly fast</p>
        </SubTitle>
      </MainWrapper>
    </HeaderMain>
  )
}

export default Header
