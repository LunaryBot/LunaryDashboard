import React from 'react';
import Script from 'next/script';
import { GetServerSideProps } from 'next'
import socket from 'socket.io-client';
import { parseCookies } from 'nookies';

import LeftMenu from '../../../../components/LeftMenu';
import LoadingPage from '../../../../components/LoadingPage';
import Header from '../../../../components/Header';
import Toggle, { CheckRadio } from '../../../../components/Toggle';
import Select, { Option } from '../../../../components/Select';

import styles from '../../../../styles/main.module.css';
import guildStyles from '../../../../styles/guild.module.css';

import { createState } from '../../../../utils/states';

import { IUser, IGuildSuper } from '../../../../types';
import { LunarPermissions } from '../../../../Constants';

interface IState {
    user: IUser | null;
    guild: IGuildSuper;
    loading: boolean;
    permissions: [id: string, value: number][];
};

interface IProps {
    theme: string;
    token: string;
    hostApi: string;
    guildId: string;
};

const permissionsNames = {
    LUNAR_BAN_MEMBERS: 'Banir Membros',
    LUNAR_KICK_MEMBERS: 'Expulsar Membros',
    LUNAR_MUTE_MEMBERS: 'Silenciar Membros',
    LUNAR_ADV_MEMBERS: 'Advertir Membros',
    LUNAR_NOT_REASON: 'Punir sem Motivo',
    LUNAR_VIEW_HISTORY: 'Ver histórico',
	LUNAR_MANAGE_HISTORY: 'Gerenciar histórico',
}

export default class DashboardMe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            guild: null,
            loading: true,
            permissions: Object.entries({})
        } as IState;
    }

    render() {
        const { user, guild, loading, permissions } = this.state as IState;
        const { token, hostApi, guildId } = this.props as IProps;

        return (
            <>
                <LoadingPage {...{loading}} />
                <Header {...{user}}/>
                <LeftMenu {...{user, guild}}/>

                <div className={`${styles['content']}`}>
                    <div className={styles['card']}>
                        <div className={guildStyles['add-button']} id={'add'}>
                            <i className={'fas fa-plus'} />
                        </div>
                        {permissions.map(([roleId, p], index) => {
                            console.log(roleId)
                            return (
                                <main key={roleId}>
                                    <Select 
                                        {...{
                                            id: `select-role-${index}`,
                                            placeholder: 'Selecione um cargo',
                                            value: guild.roles.find(role => role.id === roleId)?.name || (roleId ? 'deleted-role' : ''),
                                            style: {
                                                width: '85%',
                                                display: 'inline-block',
                                            }
                                        }}
                                    >
                                        {guild?.roles
                                        .filter(role => !role.managed && role.id != guild.id)
                                        .sort((a, b) => b.rawPosition - a.rawPosition)
                                        .map(role => (
                                            <Option 
                                                key={role.id} 
                                                data-value={role.id} 
                                                data-li={role.name}
                                                selected={role.id === roleId}
                                            >
                                                <i className={'fas fa-at'} /> {role.name}
                                            </Option>
                                        ))}
                                    </Select>
                                    <div className={guildStyles['delete-button']}><i className={'fas fa-trash'} /></div>
                                    <br />
                                    <br />
                                    <div className={guildStyles['toggles-container']}>

                                        {Object.entries(LunarPermissions).map(([key, value], index) => {
                                            return (
                                                <div className={guildStyles['item']} key={key}>
                                                    <span>{permissionsNames[key] || key}</span>
                                                    <CheckRadio style={{marginTop: '10px'}}>
                                                        <Toggle 
                                                            data-send-on-save 
                                                            data-type={'bitfield'}
                                                            data-value={value}
                                                            defaultChecked={(p & value) === value}
                                                        />
                                                    </CheckRadio>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {permissions[index + 1] && ( 
                                        <>
                                            <br />
                                            <hr />
                                            <br />
                                        </>
                                    )}
                                </main>
                            )
                        })}
                    </div>
                </div>

                <Script
                    src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
                    onLoad={() => {
                        console.log(guildId);
                        const { setState } = this;

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
                                permissions: Object.entries(data.guild.permissions || {})
                            })

                            console.log(data.guild)
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

                        $('#add').click(() => {
                            this.setState({
                                permissions: [
                                    ...((this.state as IState).permissions || []),
                                    [
                                        '',
                                        0
                                    ]
                                ]
                            })
                        })
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
            guildId: ctx.query.guild,
        },
    };
}