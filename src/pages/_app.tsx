import '../styles/globals.scss';

import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/dashboard';

import Theme from '../utils/theme';

import themesStyle from '../styles/theme.module.scss';
import { useRouter } from 'next/router';
import { APIProvider } from '../contexts/TestAPIContext';

export default function MyApp({ Component, pageProps }) {
    const [_mode, setMode] = useState<'dark'|'light'|null>(null);
    const router = useRouter();

    useEffect(() => {
        const body = document.querySelector('body');
        
        if(!_mode) {
            setMode(localStorage.getItem('theme') as 'dark' | 'light' | null || 'dark')
        }

        const mode = (localStorage.getItem('theme') as 'dark' | 'light' | null) || 'dark';

        body.setAttribute('data-theme', mode);

        window.changeMode = (mode) => {
            localStorage.setItem('theme', mode);
            document.querySelector('[data-styled]').innerHTML = `:root {${Theme({ mode: mode || 'dark' }).toString()}}`
            body.setAttribute('data-theme', mode);
        }
    });

    const Children = router.pathname.startsWith('/dashboard') ? (
        <DashboardLayout>
            <Component {...pageProps} />   
        </DashboardLayout>
    ) : <Component {...pageProps} />   

    return (
        <> 
            <Head>
                <title>Luna</title>
                <link href='https://pro.fontawesome.com/releases/v5.15.4/css/all.css' rel='stylesheet' />
                <link href='https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap' rel='stylesheet' />
                <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet' />
                <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' rel='stylesheet' />
            </Head>
            <style id={'colors'}>{`
                :root {${Theme({ mode: _mode || 'dark' })}};
            `}</style>
            <div className={'backgroundGradient'} />
            <APIProvider>
                {Children}
            </APIProvider>
        </>
    )
}