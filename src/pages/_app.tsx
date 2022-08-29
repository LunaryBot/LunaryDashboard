import '../styles/globals.scss';

import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/dashboard';

import Theme from '../utils/theme';

import themesStyle from '../styles/theme.module.scss';

export default function MyApp({ Component, pageProps }) {
    const [_mode, setMode] = useState<'dark'|'light'|null>(null);

    useEffect(() => {
        const body = document.querySelector('body');

        body.classList.add(themesStyle.root);

        console.log(themesStyle.root)
        
        if(!_mode) {
            setMode(localStorage.getItem('theme') as 'dark' | 'light' | null || 'dark')
        }

        const mode = (localStorage.getItem('theme') as 'dark' | 'light' | null) || 'dark';

        body.setAttribute('data-theme', mode);

        window.changeMode = (mode) => {
            localStorage.setItem('mode', mode);
            // document.querySelector('[data-styled]').innerHTML = `:root {${Theme({ mode: mode || 'dark' }).toString()}}`
            body.setAttribute('data-theme', mode);
        }
    }, []);

    return (
        <> 
            <Head>
                <title>Luna</title>
                <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.15.4/css/all.css" />
                <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet" />
                <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet' />
            </Head>
            <div className={"backgroundGradient"} />
            <DashboardLayout>
                <Component {...pageProps} />   
            </DashboardLayout>
        </>
    )
}