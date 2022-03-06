import React from 'react';
import Script from 'next/script';
import { GetServerSideProps } from 'next'
import socket from 'socket.io-client';
import { parseCookies } from 'nookies';

import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from '../styles/home.module.css';

import { IUser } from '../types';

interface IState {
    user: IUser | null;
};

interface IProps {
    token: string;
    hostApi: string;
};

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.state)
        this.state = {
            user: null,
        } as IState;
    }

    render() {
        const { user } = this.state as IState;
        const { token, hostApi } = this.props as IProps;

        return (
            <>
                <Script>{`
                    document.querySelector('body').style = \`
                        background: #342e4e;
                        background-color: #342e4e;
                        background-image: url('/images/home_background.png');
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center center;
                        background-attachment: fixed;
                        background-blend-mode: overlay;
                    \`
                `}</Script>
                <Header {...{user}}/>
                
                <div className={styles['fade-in']}>
                    <div className={styles['main-content']}>
                        <div className={styles['main-content-children']}>
                            <div className={styles['main-content-image']}>
                                <figure>
                                    <img src={'https://images-ext-1.discordapp.net/external/9v1spCjx1AnB9D2-OiSEvSzrXpORzx8gScClAcMhX_A/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/807225861769396225/60bab4386da65e5332379ddd2461e834.png?width=499&height=499'} alt={''} />
                                </figure>
                            </div>
                        </div>

                        <div className={`${styles['main-content-children']}`}>
                            <div className={styles['bot-icon-base']}>
                                <h1>Lunar</h1>
                                <div className={styles['bot-icon']}>
                                    <svg width={16} height={16} viewBox={'0 0 16 15.2'}>
                                        <path d={'M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z'} fill={'currentColor'}></path>
                                    </svg>
                                    BOT⠀
                                </div>
                            </div>
                            <p>#MundoDaLua | Moderação focada.</p>
                            <div className={styles['main-content-buttons']}>
                                <li>
                                    <a href={'/'} target={'_blank'}>
                                        Suporte
                                    </a>
                                </li>
                                <li>
                                    <a href={'/invite'} target={'_blank'}> 
                                        Invite 
                                    </a>
                                </li>
                                <li>
                                    <a href={'/dashboard/@me'}> 
                                        Bot Dashboard 
                                    </a>
                                </li>
                            </div>
                        </div>
                    </div>

                    <div className={styles['main-features']}>
                        <div className={styles['wave-border']}>
                            <svg 
                                version={'1.1'}
                                xmlns={'http://www.w3.org/2000/svg'} 
                                viewBox={'0 0 1440 100'} 
                                preserveAspectRatio={'none'}
                            >
                                <path 
                                    d={'M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z'} 
                                    fill={'currentColor'} 
                                />
                            </svg>
                        </div>
                        <div className={styles['main-features-background']}>
                            <div className={styles['feature-row']}>
                                <div className={styles['feature-column']}>
                                    <div className={styles['feature-column-image']} data-tilt>
                                        <img src={'https://imgur.com/0w2vFrO.png'} alt={''} />
                                    </div>
                                </div>
                                <div className={styles['feature-column']}>
                                    <h1>Gerenciamento</h1>
                                    <br />
                                    <p>A Lunar conta com comandos de moderação e administramento simples, porém poderosos, para manter seu servidor sob controle, sem dar muito trabalho e poder para a sua equipe.</p>
                                </div>
                            </div>
                            <div className={styles['feature-row']}>
                                <div className={styles['feature-column']}>
                                    <h1>Moderação sem dar muito poder para os moderadores?</h1>
                                    <br />
                                    <p>Eu tenho a solução para você! A Lunar conta com um sistema de permissões personalizáveis que trabalham separadas as genéricas permissões do Discord. Vamos te dar um exemplo: você gostaria de adicionar alguém como moderador, para isso teria que dar a permissão de 'Gerenciar Mensagens', mas nas configurações de meu site você adicionar permissões especiais para cada cargo em seu servidor do Discord de uma forma prática e maravilhosa!</p>                    
                                </div>
                                <div className={styles['feature-column']}>
                                    <div className={`${styles['feature-column-image']} ${styles['secondIMG']}`} data-tilt>
                                        <img src={'https://cdn.discordapp.com/attachments/767078013388849212/949810152297603132/unknown.png'} alt={''} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles['wave-border']}>
                            <svg 
                                version={'1.1'} 
                                xmlns={'http://www.w3.org/2000/svg'} 
                                viewBox={'0 0 1440 100'} 
                                preserveAspectRatio={'none'} 
                                style={{ transform: 'scaleY(-1) translateY(1px)'}}
                            >
                                <path 
                                    d={'M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z'} 
                                    fill={'var(--luny-colors-icon)'} 
                                />
                            </svg>
                        </div>
                    </div>

                    <div className={styles["main-links"]} id="lunaVote">
                        <div className={styles["link-container"]}>
                            <div className={styles['link-content']}>
                                <h1 style={{position: 'relative', top: '-7px'}}><img src="https://cdn.discordapp.com/emojis/816714442368352296.gif?v=1" style={{position: 'relative', bottom: '-5px'}} width="30px" /> Vote na Lunar</h1>
                                <p>
                                    A Lunar está na botlist <strong>top.gg</strong>, que tal mostrar seu apoio? Vote na Lunar e deixe um comentário para a gente saber o que precisamos melhorar.
                                    <br />
                                    <br />
                                    A, e em breve quando você votar você irá ganhar algumas Luas como agradecimento!
                                </p>
                                <br />
                                <a href="/vote" target="_blank">
                                    <div className={styles["link-button"]}>
                                        Yep!
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className={styles["link-container"]}>
                            <div className={styles['link-content']}>
                                <h1><i className={'fab fa-discord'}></i> Suporte</h1>
                                <p>
                                    No servidor de suporte você poderá tirar todas as suas dúvidas sobre a utilização da Lunar!
                                    <br />
                                    <br />
                                    No servidor de suporte você também poderá dar sugestões, e também reportar bugs/falhas. Além de encontrar uma FAQ (Frequently asked questions) que poderam te ajudar na utilização da Lunar!
                                </p>
                                <br />
                                <a href="/support" target="_blank">
                                    <div className={styles["link-button"]}>
                                        Join!
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className={styles["link-empty-child"]} />
                    </div>

                    {/* <div className={styles["featured-video"]}>
                        <div className={styles["video"]}>
                            <video src="" controls />
                        </div>
                    </div> */}
                </div>

                <div className={`${styles['wave-border']} ${styles['footer']}`}>
                    <svg 
                        version={'1.1'}
                        xmlns={'http://www.w3.org/2000/svg'} 
                        viewBox={'0 0 1440 100'} 
                        preserveAspectRatio={'none'}
                    >
                        <path 
                            d={'M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z'} 
                            fill={'currentColor'} 
                        />
                    </svg>
                </div>
                <Footer />

                <Script
                    src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
                    onLoad={() => {
                        const api = socket(hostApi, {
                            query: {
                                token,
                            },
                        });

                        api.on('ready', ({ data }) => {
                            this.setState({
                                user: data.user,
                            });
                        });
                    }}
                ></Script>
            </>
        );
    }
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
    const { ['__SessionLuny']: token = null } = parseCookies(ctx); 

    return {
        props: {
            token,
            hostApi: process.env.HOST_API,
        },
    };
}