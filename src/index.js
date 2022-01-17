import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #fafafa;
    font-family: 'Roboto', sans-serif;
    margin: 0;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);