import React from 'react';
import Script from 'next/script';
import { GetServerSideProps } from 'next'
import socket from 'socket.io-client';
import { parseCookies } from 'nookies';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import LeftMenu from '../../../../components/LeftMenu';
import LoadingPage from '../../../../components/LoadingPage';
import Header from '../../../../components/Header';
import Charts from '../../../../components/Charts';

import styles from '../../../../styles/main.module.css';
import guildStyles from '../../../../styles/guild.module.css';

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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    stacked: false,
    plugins: {
        // title: {
        //     display: true,
        //     text: '',
        // },
    },
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left' as const,
        },
    },
};

const dataPunishmentsTypes = {
    labels: Last7Days(),
    datasets: [
        {
            label: 'Bans',
            data: Array(7).fill(0),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
        },
        {
            label: 'Kicks',
            data: Array(7).fill(0),
            borderColor: 'rgb(234, 137, 53)',
            backgroundColor: 'rgba(234, 137, 53, 0.5)',
            yAxisID: 'y',
        },
        {
            label: 'Mutes',
            data: Array(7).fill(0),
            borderColor: 'rgb(75, 140, 210)',
            backgroundColor: 'rgba(75, 140, 210, 0.5)',
            yAxisID: 'y',
        },
        {
            label: 'Advs',
            data: Array(7).fill(0),
            borderColor: 'rgb(234, 172, 53)',
            backgroundColor: 'rgba(234, 172, 53, 0.5)',
            yAxisID: 'y',
        },
    ],
};

const dataPunishments = {
    labels: Last7Days(),
    datasets: [
        {
            label: 'Punishments',
            data: Array(7).fill(0),
            borderColor: 'rgb(255, 255, 0)',
            backgroundColor: 'rgb(255, 255, 0, 0.5)',
            yAxisID: 'y',
        },
    ]
}

export default class DashboardGuild extends React.Component {
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
                    <div className={styles['small-card']}>
                        <h3>Punishments</h3>
                        <br />
                        <Line
                            {...{
                                data: dataPunishments,
                                options,
                            }}
                        />
                    </div>
                    <div className={styles['small-card']}>
                        <h3>Punishments Types</h3>
                        <br />
                        <Line
                            {...{
                                data: dataPunishmentsTypes,
                                options,
                            }}
                        />
                    </div>
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

function Last7Days() {
    const currentDate = new Date('03/02/2022 00:00');
    const now = Date.now()

    const dates = [currentDate, ...Array(6).fill(0).map((_, i) => new Date(now - ((i + 1) * 1000 * 60 * 60 * 24)))]

    return dates.map(formatDate)
}

function formatDate(date){
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    if(dd < 10) { dd = '0' + dd }
    if(mm < 10) { mm = '0' + mm }
    date = dd + '/' + mm  + '/' + yyyy;
    return date
}