import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { useState, useEffect } from 'react';

import '../styles/styles.css';
import Theme from '../utils/theme';

export default function MyApp({ Component, pageProps }) {
    const [mode, setMode] = useState<'dark'|'light'|null>(null);

    useEffect(() => {
        if(!mode) {
            setMode(localStorage.getItem('mode') as 'dark' | 'light' | null || 'dark')
        }
    }, []);

    const GlobalStyles = createGlobalStyle`
        :root {${Theme({ mode: mode || 'dark' }).toString()}}
    `

    return (
        <> 
            <Head>
                <title>Luna</title>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css" />
                <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyles id="globalstyles" />
            <div className={"background-gradient"} />
            <Component {...pageProps} />
        </>
    )
}