import React from 'react';

import styles from '../styles/Footer.module.css';

export default class Footer extends React.Component {
    render() {
        return (
            <>
                <footer className={styles['footer']}>
                    <div className={styles['l-footer']}>
                        <h1>
                            Lunar Bot
                        </h1>
                        <p>
                            Projeto desenvolvido por IsLuny representada por JVOPINHO (Bae). 
                            <br /> 
                            <br />
                            © Bae.#7500 &amp; <a href='/team' style={{color: 'var(--luny-colors-band-100)'}}>Lunary Team</a>. 
                            <br />
                            💜 2020 - {(new Date()).getFullYear()}
                        </p>
                    </div>
                    <ul className={styles['r-footer']}>
                        <li>
                            <h2>Social</h2>
                            <ul className={styles['box']}>
                                <li><a href={'#'}>Github</a></li>
                                <li><a href={'#'}>Twitter</a></li>
                            </ul>
                        </li>
                        <li>
                            <h2>Legal</h2>
                            <ul className={styles['box']}>
                                <li><a href={'#'}>Privacy Policy</a></li>
                                <li><a href={'#'}>Terms of Use</a></li>
                                <li><a href={'#'}>Contract</a></li>
                            </ul>
                        </li>
                        {/* <li className={styles['features']}>
                            <h2>Features</h2>
                            <ul className={styles['box h-box']}>
                                <li><a href={'#'}>Moderação</a></li>
                            </ul>
                        </li> */}
                    </ul>
                    <div className={styles['b-footer']}>
                        ...
                    </div>
                </footer>
            </>
        )
    }
} 