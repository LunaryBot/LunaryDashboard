import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';

import '../styles/styles.css';
import Theme from '../utils/theme';

export default function MyApp({ Component, pageProps }) {
    const GlobalStyles = createGlobalStyle`
        :root {${Theme({ mode: pageProps.mode || 'dark' }).toString()}}
    `

    return (
        <> 
            <Head>
                <title>Luna</title>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css" />
                <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyles id="globalstyles" />
            <Component {...pageProps} />
        </>
    )
}