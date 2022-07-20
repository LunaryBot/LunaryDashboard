import React from 'react';
import { GetServerSideProps } from 'next'
import socket from 'socket.io-client';
import { parseCookies } from 'nookies';

import LeftMenu from '../../../components/LeftMenu';
import LoadingPage from '../../../components/LoadingPage';
import Header from '../../../components/Header';
import GuildCard from '../../../components/GuildCard';

import styles from '../../../styles/main.module.css';

import { createState } from '../../../utils/states';

import { IUser, IGuildData } from '../../../types';
import { Permissions } from '../../../Constants';

interface IState {
    user: IUser | null;
    guilds: IGuildData[];
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
            guilds: [],
            loading: true,
        } as IState;
    }

    componentDidMount(): void {
        const { token, hostApi } = this.props as IProps;

        const api = socket(hostApi, {
            query: {
                token,
                fetchGuilds: true
            },
        });

        api.on('ready', ({ data }) => {
            console.log(data)
            this.setState({
                user: data.user,
                guilds: data.guilds,
                loading: false,
            });
        });

        api.on('error', ({ data }) => {
            console.log(data);

            if(!data?.message || `${data.message}`.toLowerCase().includes('token')) {
                return window.location.href = '/api/auth/login?dt=true';
            };
        });
    }

    render() {
        const { user, guilds, loading } = this.state as IState;

        return (
            <>
                <LoadingPage {...{loading}} />
                <Header {...{user}}/>
                <LeftMenu {...{user}}/>

                <div className={`${styles['content']}`}>
                    {guilds
                        .filter(guild => guild.owner || (guild.permissions & Permissions.ADMINISTRATOR) == Permissions.ADMINISTRATOR)
                        .map((guild, index) => ( <GuildCard {...{guild}} key={guild.id}/> ))
                    }
                </div>
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