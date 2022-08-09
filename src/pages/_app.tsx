import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/dashboard';

import Theme from '../utils/theme';

export default function MyApp({ Component, pageProps }) {
    const [_mode, setMode] = useState<'dark'|'light'|null>(null);

    useEffect(() => {
        if(!_mode) {
            setMode(localStorage.getItem('mode') as 'dark' | 'light' | null || 'dark')
        }

        const mode = (localStorage.getItem('mode') as 'dark' | 'light' | null) || 'dark';

        const body = document.querySelector('body');

        body.setAttribute('data-mode', mode);
        
        window.changeMode = (mode) => {
            localStorage.setItem('mode', mode);
            document.querySelector('[data-styled]').innerHTML = `:root {${Theme({ mode: mode || 'dark' }).toString()}}`
            body.setAttribute('data-mode', mode);
        }
    }, []);

    const GlobalStyles = createGlobalStyle`
        :root {${Theme({ mode: _mode || 'dark' }).toString()}}
    `

    return (
        <> 
            <Head>
                <title>Luna</title>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css" />
                <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet" />
                <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet' />
            </Head>
            <GlobalStyles id="globalstyles" />
            <div className={"backgroundGradient"} />
            <DashboardLayout>
                <Component {...pageProps} />   
            </DashboardLayout>
        </>
    )
}