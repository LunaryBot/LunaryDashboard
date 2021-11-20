import { createGlobalStyle } from 'styled-components'
import "@fortawesome/fontawesome-free/css/all.min.css";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    background-color: #1e1e22;
  }
`

export default function MyApp({ Component, pageProps }) {
  return (
    <> 
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}