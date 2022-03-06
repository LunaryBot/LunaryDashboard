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
                                alt={"Bae-banner"}
                                src={"https://cdn.discordapp.com/attachments/609912897769963571/949725118538592318/empty-discord-banner.png"}
                            />
                            <div className={styles['avatar']}>
                                <img 
                                    alt={"Bae-avatar"}
                                    src={"https://cdn.discordapp.com/avatars/452618703792766987/f2f045703e2a6ae1acd5685299535503.png?size=128"}
                                />
                            </div>
                            <div className={styles['user']}>
                                <h3 className={styles['username']}>
                                    Bae.
                                    <span className={styles['tag']}>#7500</span>
                                </h3>
                            </div>
                            <h3 className={`${styles['role']} ${styles['bigRole']}`}>
                                Owner, Head Developer
                            </h3>
                            <hr />
                            <h3 className={styles['description']}>
                                <h3 className={styles['topText']}>SOBRE MIM</h3>
                                Um dev ae.
                            </h3>
                            <div className={styles['socialMedia']}>
                                <a href="https://discord.com/users/452618703792766987" target={"_blank"} className={styles['discord']}>
                                    <i className="fab fa-discord" />
                                </a>    
                                <a href="https://github.com/JVOPINHO" target={"_blank"} className={styles['github']}>
                                    <i className="fab fa-github" />
                                </a>    
                            </div>
                        </div>
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
                                    Website Builder
                                </h3>
                            </div>
                            <hr />
                            <h3 className={styles['description']}>
                                <h3 className={styles['topText']}>SOBRE MIM</h3>
                                Um dev ae.
                            </h3>
                            <div className={styles['socialMedia']}>
                                <a href="https://discord.com/users/522752913794138112" target={"_blank"} className={styles['discord']}>
                                    <i className="fab fa-discord" />
                                </a>    
                                <a href="https://github.com/victorpantarotti" target={"_blank"} className={styles['github']}>
                                    <i className="fab fa-github" />
                                </a>    
                            </div>
                        </div>
                        <div className={styles['item']}>
                            <img
                                className={styles['banner']}
                                alt={"bypolaaro.-banner"}
                                src={"https://cdn.discordapp.com/attachments/609912897769963571/949725118538592318/empty-discord-banner.png"}
                            />
                            <div className={styles['avatar']}>
                                <img 
                                    alt={"bypolaaro.-avatar"}
                                    src={"https://cdn.discordapp.com/avatars/846864605179674664/16be1a0cbb63189a927dd6fc132f214a.png?size=128"}
                                />
                            </div>
                            <div className={styles['user']}>
                                <h3 className={styles['username']}>
                                    bypolaaro.
                                    <span className={styles['tag']}>#8450</span>
                                </h3>
                                <h3 className={styles['role']}>
                                    Designer
                                </h3>
                            </div>
                            <hr />
                            <h3 className={styles['description']}>
                                <h3 className={styles['topText']}>SOBRE MIM</h3>
                                Um dev ae.
                            </h3>
                            <div className={styles['socialMedia']}>
                                <a href="https://discord.com/users/846864605179674664" target={"_blank"} className={styles['discord']}>
                                    <i className="fab fa-discord" />
                                </a>    
                                <a href="https://github.com/SayranFelix" target={"_blank"} className={styles['github']}>
                                    <i className="fab fa-github" />
                                </a>    
                            </div>
                        </div>
                        <div className={styles['item']}>
                            <img
                                className={styles['banner']}
                                alt={"Weariful-banner"}
                                src={"https://cdn.discordapp.com/attachments/609912897769963571/949725118538592318/empty-discord-banner.png"}
                            />
                            <div className={styles['avatar']}>
                                <img 
                                    alt={"Weariful-avatar"}
                                    src={"https://cdn.discordapp.com/avatars/343778106340802580/a18fc88a59d7ff607fbdae966b8082b7.png?size=128"}
                                />
                            </div>
                            <div className={styles['user']}>
                                <h3 className={styles['username']}>
                                    Weariful
                                    <span className={styles['tag']}>#6650</span>
                                </h3>
                            </div>
                            <h3 className={`${styles['role']} ${styles['bigRole']}`}>
                                Assistant Developer
                            </h3>
                            <hr />
                            <h3 className={styles['description']}>
                                <h3 className={styles['topText']}>SOBRE MIM</h3>
                                Um dev ae.
                            </h3>
                            <div className={styles['socialMedia']}>
                                <a href="https://discord.com/users/343778106340802580" target={"_blank"} className={styles['discord']}>
                                    <i className="fab fa-discord" />
                                </a>    
                                <a href="https://github.com/WearifulCupid0" target={"_blank"} className={styles['github']}>
                                    <i className="fab fa-github" />
                                </a>    
                            </div>
                        </div>
                        <div className={styles['item']}>
                            <img
                                className={styles['banner']}
                                alt={"! Canary. 🍁-banner"}
                                src={"https://cdn.discordapp.com/banners/754429840857497760/2a1697ccb1f088700c5ca886fdfc5022.png?size=320"}
                            />
                            <div className={styles['avatar']}>
                                <img 
                                    alt={"! Canary. 🍁-avatar"}
                                    src={"https://cdn.discordapp.com/avatars/754429840857497760/4ff3f1cfa9b66cd1abe5e07a1780defb.png?size=128"}
                                />
                            </div>
                            <div className={styles['user']}>
                                <h3 className={styles['username']}>
                                    ! Canary. 🍁
                                    <span className={styles['tag']}>#3900</span>
                                </h3>
                            </div>
                            <h3 className={`${styles['role']} ${styles['bigRole']}`}>
                                Assistant Developer
                            </h3>
                            <hr />
                            <h3 className={styles['description']}>
                                <h3 className={styles['topText']}>SOBRE MIM</h3>
                                Um dev ae.
                            </h3>
                            <div className={styles['socialMedia']}>
                                <a href="https://discord.com/users/754429840857497760" target={"_blank"} className={styles['discord']}>
                                    <i className="fab fa-discord" />
                                </a>    
                                <a href="https://github.com/Canary2000"  target={"_blank"} className={styles['github']}>
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