import { createGlobalStyle } from 'styled-components';
// import "@fortawesome/fontawesome-free/css/all.min.css";
import Head from 'next/head';
import "../styles/SideBar.css";
import "../styles/NavBar.css"
import '../styles/commands.css';
import '../styles/select-menu.css';

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
        font-family: cursive;
        background-color: #1e1e22;
        color: white
    }

    body::-webkit-scrollbar {
        width: 5px;
    }
        
    body::-webkit-scrollbar-track {
        background: #16131B;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    body::-webkit-scrollbar-thumb {
        background-color: #A020F0;
        /*outline: 1px solid slategrey;*/
        border-radius: 0.5em;
    }

    a {
        text-decoration: none;
    }
`

export default function MyApp({ Component, pageProps }) {
    return (
        <> 
            <Head>
                <title>Luna</title>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css" />
                {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" /> */}
                <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}