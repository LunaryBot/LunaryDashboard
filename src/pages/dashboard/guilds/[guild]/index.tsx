import React from 'react';
import Script from 'next/script';
import { GetServerSideProps } from 'next'
import socket from 'socket.io-client';
import { parseCookies } from 'nookies';

import LeftMenu from '../../../../components/LeftMenu';
import LoadingPage from '../../../../components/LoadingPage';
import Header from '../../../../components/Header';

import styles from '../../../../styles/main.module.css';

import { createState } from '../../../../utils/states';

import { IUser, IGuildSuper } from '../../../../types';

interface IState {
    user: IUser | null;
    guild: IGuildSuper;
    loading: boolean;
};

interface IProps {
    theme: string;
    token: string;
    hostApi: string;
    guildId: string;
};

export default class DashboardMe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            guild: null,
            loading: true,
        } as IState;
    }

    render() {
        const { user, guild, loading } = this.state as IState;
        const { token, hostApi, guildId } = this.props as IProps;

        return (
            <>
                <LoadingPage {...{loading}} />
                <Header {...{user}}/>
                <LeftMenu {...{user, guild}}/>

                <div className={`${styles['content']}`}>
                    
                </div>

                <Script
                    src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
                    onLoad={() => {
                        console.log(guildId);

                        const api = socket(hostApi, {
                            query: {
                                token,
                                guildId,
                            },
                        })

                        api.on('ready', ({ data }) => {
                            this.setState({
                                user: data.user,
                                guild: data.guild,
                                loading: false,
                            })
                        });

                        api.on('error', ({ data }) => {
                            console.log(data);

                            if(!data?.message || `${data.message}`.toLowerCase().includes('token')) {
                                return window.location.href = '/api/auth/login?dt=true';
                            };

                            if(`${data.message}`.toLowerCase() == 'invalid guild') {
                                return window.location.href = `/invite?guildId=${guildId}`;
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
            destination: `/api/auth/login?state=${encodeURIComponent(ctx.req.url)}`,
            permanent: false,
        } 
    };

    return {
        props: {
            token,
            hostApi: process.env.HOST_API,
            guildId: ctx.query.guild,
        },
    };
}