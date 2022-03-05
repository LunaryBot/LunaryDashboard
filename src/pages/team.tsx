import React from 'react';
import Script from 'next/script';
import { GetServerSideProps } from 'next'
import socket from 'socket.io-client';
import { parseCookies } from 'nookies';

import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from '../styles/team.module.css';

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

                <div className={styles['content']}>
                    <div className={styles['introduction']}>
                        <h1 className={styles['title']}>Lunary Team</h1>
                        <h3 className={styles['subTitle']}>A equipe maravilhosa que fez um bot maravilhoso.</h3>
                    </div>
                    <div className={styles['grid']}>
                        <div className={styles['item']}>
                            <img
                                className={styles['banner']}
                                alt={"VhGamess_1-banner"}
                                src={"https://cdn.discordapp.com/attachments/609912897769963571/949725118538592318/empty-discord-banner.png"}
                            />
                            <div className={styles['avatar']}>
                                <img 
                                    alt={"VhGamess_1-avatar"}
                                    src={"https://cdn.discordapp.com/avatars/522752913794138112/9f81dd922901d2108219c9960ecf86f4.png?size=128"}
                                />
                            </div>
                            <div className={styles['user']}>
                                <h3 className={styles['username']}>
                                    VhGamess_1
                                    <span className={styles['tag']}>#8157</span>
                                </h3>
                                <h3 className={styles['role']}>
                                    Dev
                                </h3>
                            </div>
                            <hr />
                            <h3 className={styles['description']}>
                                <h3 className={styles['topText']}>SOBRE MIM</h3>
                                Um dev ae.
                            </h3>
                            <div className={styles['socialMedia']}>
                                <a href="#" className={styles['discord']}>
                                    <i className="fab fa-discord" />
                                </a>    
                                <a href="#" className={styles['github']}>
                                    <i className="fab fa-github" />
                                </a>    
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
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