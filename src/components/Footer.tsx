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
                                <li><a href={process.env.LUNA_SUPPORT} target={'_blank'}>Discord</a></li>
                                <li><a href={process.env.LUNA_GITHUB} target={'_blank'}>Github</a></li>
                                <li><a href={process.env.LUNA_TWITTER} target={'_blank'}>Twitter</a></li>
                            </ul>
                        </li>
                        <li>
                            <h2>Legal</h2>
                            <ul className={styles['box']}>
                                <li><a href={'/privacy'}>Privacy Policy</a></li>
                                <li><a href={'/terms'}>Terms of Use</a></li>
                                <li><a href={'/support'}>Contract</a></li>
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
                        <svg
                            className={styles["icon"]} 
                            version="1.1" 
                            id="Layer_1" 
                            xmlns="http://www.w3.org/2000/svg" 
                            xmlnsXlink="http://www.w3.org/1999/xlink" 
                            x="0px" 
                            y="0px" 
                            viewBox="0 0 122.88 122.89" 
                            xmlSpace="preserve"
                        >
                            <g>
                                <path 
                                    d="M49.06,1.27c2.17-0.45,4.34-0.77,6.48-0.98c2.2-0.21,4.38-0.31,6.53-0.29c1.21,0.01,2.18,1,2.17,2.21 c-0.01,0.93-0.6,1.72-1.42,2.03c-9.15,3.6-16.47,10.31-20.96,18.62c-4.42,8.17-6.1,17.88-4.09,27.68l0.01,0.07 c2.29,11.06,8.83,20.15,17.58,25.91c8.74,5.76,19.67,8.18,30.73,5.92l0.07-0.01c7.96-1.65,14.89-5.49,20.3-10.78 c5.6-5.47,9.56-12.48,11.33-20.16c0.27-1.18,1.45-1.91,2.62-1.64c0.89,0.21,1.53,0.93,1.67,1.78c2.64,16.2-1.35,32.07-10.06,44.71 c-8.67,12.58-22.03,21.97-38.18,25.29c-16.62,3.42-33.05-0.22-46.18-8.86C14.52,104.1,4.69,90.45,1.27,73.83 C-2.07,57.6,1.32,41.55,9.53,28.58C17.78,15.57,30.88,5.64,46.91,1.75c0.31-0.08,0.67-0.16,1.06-0.25l0.01,0l0,0L49.06,1.27 L49.06,1.27z"
                                />
                            </g>
                        </svg>
                        <button onClick={() => location.href = '/invite'}>Invite Lunar</button>
                    </div>
                </footer>
            </>
        )
    }
} 