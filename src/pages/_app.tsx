import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';

const tonalits = Object.entries({
    "5": '0d', 
    "10": '1a', 
    "15": '26', 
    "20": '33', 
    "40": '66', 
    "60": '99', 
    "80": 'cc', 
    "100": ''
})

const baseColor = '#ffffff';
const baseColor2 = '#000000';
const baseBandColor = '#A020F0'

const GlobalStyle = createGlobalStyle`
    :root {
        // #f6f6f6 #0d0510
        --background: #0d0510;
        ${tonalits.map(([key, value]) => `--luny-colors-text-${key}: ${baseColor}${value};`).join('\n')}
        ${tonalits.map(([key, value]) => `--luny-colors-flow-${key}: ${baseColor2}${value};`).join('\n')}
        ${tonalits.map(([key, value]) => `--luny-colors-ui-${key}: ${baseColor}${value};`).join('\n')}
        ${tonalits.map(([key, value]) => `--luny-colors-band-${key}: ${baseBandColor}${value};`).join('\n')}
        ${tonalits.map(([key, value]) => `--luny-colors-light-${key}: ${baseColor}${value};`).join('\n')}
        ${tonalits.map(([key, value]) => `--luny-colors-dark-${key}: ${baseColor2}${value};`).join('\n')}
    }
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
        background-color: var(--background);
        color: var(--font-primary-color)
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