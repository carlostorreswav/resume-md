import styled from "styled-components"

export const Button = styled.button`
  outline: 0;
  border: 0;
  background: none;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 50px;
  margin: 10px;
  padding: 8px 16px;
  &:hover {
    background-color: #ccc;
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
