import React from 'react';
import Script from 'next/script';
import { GetServerSideProps } from 'next'
import socket from 'socket.io-client';
import { parseCookies } from 'nookies';

import LeftMenu from '../../../components/LeftMenu';
import LoadingPage from '../../../components/LoadingPage';
import Header from '../../../components/Header';

import styles from '../../../styles/main.module.css';

import { createState } from '../../../utils/states';

import { IUser } from '../../../types';
import CardLog from '../../../components/CardLog';

interface IState {
    user: IUser | null;
    loading: boolean;
};

interface IProps {
    theme: string;
    token: string;
    hostApi: string;
};

export default class DashboardMe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            loading: true,
        } as IState;
    }

    render() {
        const { user, loading } = this.state as IState;
        const { token, hostApi } = this.props as IProps;

        return (
            <>
                <LoadingPage {...{loading}} />
                <Header {...{user}}/>
                <LeftMenu {...{user}}/>

                <CardLog 
                    {...{
                        avatar: "https://cdn.discordapp.com/avatars/522752913794138112/9f81dd922901d2108219c9960ecf86f4.png",
                        user: "VhGamess_1#8157",
                        data: "21.02.2022",
                        reason: "a",
                        author: "Bae.#7500"
                    }}
                />

                <div className={`${styles['content']}`}>
                    <div className={styles['small-card']}>
                        {user?.username || '...'}
                    </div>
                    <div className={styles['small-card']}>
                        {user?.username || '...'}
                    </div>
                </div>

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
                                loading: false,
                            });
                        });

                        api.on('error', ({ data }) => {
                            console.log(data);

                            if(!data?.message || `${data.message}`.toLowerCase().includes('token')) {
                                return window.location.href = '/api/auth/login?dt=true';
                            };
                        });
                    }}
                ></Script>
            </>
        );
    }
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
    const { ['__SessionLuny']: token } = parseCookies(ctx); 

    if(!token) return { 
        redirect: {
            destination: `/api/auth/login?state=${createState({ url: ctx.req.url })}`,
            permanent: false,
        } 
    };

    return {
        props: {
            token,
            hostApi: process.env.HOST_API,
        },
    };
}