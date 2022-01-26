import styled from "styled-components"

export const Button = styled.button`
  outline: 0;
  border: 0;
  background: none;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 50px;
  margin: ${p => p.margin || "10px"};
  padding: ${p => p.padding || "8px 16px"};
  font-size: ${p => p.fontSize || "14px"};
  font-weight: ${p => p.fontWeight || "normal"};
  &:hover {
    background-color: #333;
    color: white;
  }
  transition: all 0.3s ease-in-out;
`
export const CustomHr = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background-color: #ccc;
`

const MyA = styled.a`
  color: ${p => p.color || "pink"};
  text-decoration: ${p => p.textDecoration || "underline"};
  font-weight: ${p => p.fontWeight || "bold"};
  cursor: pointer;
  &:hover {
    color: ${p => p.hoverColor || "red"};
  }
  transition: color 0.2s ease-in-out;
`

export const CustomA = props => {
  const { children, ...rest } = props
  return (
    <>
      &nbsp;
      <MyA href={rest.url} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </MyA>
      &nbsp;
    </>
  )
}
