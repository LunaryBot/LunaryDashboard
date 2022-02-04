import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';

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
                <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}