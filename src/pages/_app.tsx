import { createGlobalStyle } from 'styled-components';
// import "@fortawesome/fontawesome-free/css/all.min.css";
import Head from 'next/head';
import "../styles/SideBar.css";
import "../styles/NavBar.css"
import Script from 'next/script';

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
      <Head>
        <title>Luna</title>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css" />
        {/* <script src="https://raw.githubusercontent.com/LunaryBot/LunaryWebsite/master/src/assets/js/jquery.js"></script> */}
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />

      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        type="text/javascript"
        onLoad={() => {
          console.log('jquery loaded')
          console.log($('#SidebarBtn').hasClass('active'))
        }}
      />
    </>
  )
}