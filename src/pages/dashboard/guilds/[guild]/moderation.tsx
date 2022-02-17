import React from 'react';
import Script from 'next/script';
import { GetServerSideProps } from 'next'
import socket from 'socket.io-client';
import { parseCookies } from 'nookies';

import LeftMenu from '../../../../components/LeftMenu';
import LoadingPage from '../../../../components/LoadingPage';
import Header from '../../../../components/Header';
import Select, { Option } from '../../../../components/Select';
import Toggle, { CheckRadio } from '../../../../components/Toggle';

import styles from '../../../../styles/main.module.css';

import { createState } from '../../../../utils/states';

import { IUser, IGuildSuper, IChannel } from '../../../../types';
import { GuildConfigs } from '../../../../Constants';

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
                    <div className={styles['small-card']}>
                        <h3>Canal de modlogs</h3>
                        <br />
                        <Select 
                            {...{
                                id: 'select-modlogs-channel',
                                placeholder: 'Selecione o canal',
                                value: guild?.channels.find(channel => ["GUILD_TEXT", "GUILD_NEWS"].includes(channel.type) && channel.id == guild.modlogs_channel)?.name
                            }} 
                            data-value={guild?.modlogs_channel} 
                            data-send-on-save 
                            data-type={'select'}
                        >
                            <Option 
                                data-value={'none'} 
                                data-li={'Nenhum canal selecionado'}
                                selected={!guild?.punishments_channel}
                            >
                                <i className={'fas fa-folder-times'} /> Nunhum
                            </Option>
                            {guild?.channels
                            .filter(channel => ["GUILD_TEXT", "GUILD_NEWS"].includes(channel.type))
                            .map(channel => (
                                <Option 
                                    key={channel.id} 
                                    data-value={channel.id} 
                                    data-li={channel.name}
                                    selected={channel.id === guild.modlogs_channel}
                                >
                                    <i className={'fas fa-hashtag'} /> {channel.name}
                                </Option>
                            ))}
                        </Select>
                        <br />
                        <p>
                            Canal onde será enviado as mensagem de modlogs. <a href="https://imgur.com/eUWWLQ8.png"><code>Exemplo</code></a>
                            <br /><code style={{color: "var(--luny-colors-green)"}}>+ Mostra autor, usuário, motivo, id e link para log punição</code>, 
                            <br /><code style={{color: "var(--luny-colors-red)"}}>- Não é possível customizar</code>
                        </p>
                    </div>

                    <div className={styles['small-card']}>
                        <h3>Canal de Punicões</h3>
                        <br />
                        <Select 
                            {...{
                                id: 'select-punishments-channel',
                                placeholder: 'Selecione o canal',
                                value: guild?.channels.find(channel => ["GUILD_TEXT", "GUILD_NEWS"].includes(channel.type) && channel.id == guild.punishments_channel)?.name
                            }} 
                            data-value={guild?.punishments_channel} 
                            data-send-on-save 
                            data-type={'select'}
                        >
                            <Option 
                                data-value={'none'} 
                                data-li={'Nenhum canal selecionado'}
                                selected={!guild?.punishments_channel}
                            >
                                <i className={'fas fa-folder-times'} /> Nunhum
                            </Option>
                            {guild?.channels
                            .filter(channel => ["GUILD_TEXT", "GUILD_NEWS"].includes(channel.type))
                            .map(channel => (
                                <Option 
                                    key={channel.id} 
                                    data-value={channel.id} 
                                    data-li={channel.name}
                                    selected={channel.id === guild.punishments_channel}
                                >
                                    <i className={'fas fa-hashtag'} /> {channel.name}
                                </Option>
                            ))}
                        </Select>
                        <br />
                        <p>
                            Canal onde será enviado as mensagem de punições.
                            <br /><code style={{color: "var(--luny-colors-green)"}}>+ Customização possível (BETA)</code>, 
                            <br /><code style={{color: "var(--luny-colors-red)"}}>- Não mostra id e link de log da punição</code>
                        </p>
                    </div>

                    <div className={styles['card']}>
                        <CheckRadio>
                            <p><Toggle  
                                data-send-on-save 
                                data-type={'bitfield'}
                                data-value={GuildConfigs.MANDATORY_REASON}
                                defaultChecked={(guild?.configs & GuildConfigs.MANDATORY_REASON) == GuildConfigs.MANDATORY_REASON}
                            /> <label style={{marginLeft: '0.8%', fontSize: '18px'}}><strong>Tornar obrigatório ter um motivo para as punições</strong></label></p>
                            <p>Permitir que uma punição usando a Lunar só possa ser efetuada com um motivo especificado.<br />Essa opção só ira ser aplicada para usuários que não possuem um cargo com a permissão <code>Punir sem motivo</code>.</p>
                        </CheckRadio>
                    
                        <hr />

                        <CheckRadio>
                            <p><Toggle  
                                data-send-on-save 
                                data-type={'bitfield'}
                                data-value={GuildConfigs.LOG_UNBAN}
                                defaultChecked={(guild?.configs & GuildConfigs.LOG_UNBAN) == GuildConfigs.LOG_UNBAN}
                            /><label style={{marginLeft: '1%', fontSize: '18px'}}><strong>Registrar evento de "unban"</strong></label></p>
                            <p>Registrar no canal de modlogs quando um banimento for retirado.<br />Para mostrar o motivo e o autor, você precisa dar ao bot permissão de <code>Ver registro de autoria</code>.</p>
                        </CheckRadio>

                        <hr />

                        <CheckRadio>
                            <p><Toggle  
                                data-send-on-save 
                                data-type={'bitfield'}
                                data-value={GuildConfigs.LOG_EVENTS}
                                defaultChecked={(guild?.configs & GuildConfigs.LOG_EVENTS) == GuildConfigs.LOG_EVENTS}
                            /><label style={{marginLeft: '1%', fontSize: '18px'}}><strong>Eventos de banimento não feitos através da Lunar</strong></label></p>
                            <p>Registrar no canal de modlogs e punições quando um banimento for aplicado e não tenha sido feito pela Lunar.<br />Para mostrar o motivo e o autor, você precisa dar ao bot permissão de <code>Ver registro de autoria</code>.</p>
                        </CheckRadio>
                    </div>
                </div>

                <Script
                    src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
                    onLoad={() => {
                        const buttonSave = $('#save-button');
                        const sendingClass = styles['sending'];

                        const api = socket(hostApi, {
                            query: {
                                token,
                                guildId,
                            },
                        });

                        api.on('ready', ({ data }) => {
                            console.log(data)
                            this.setState({
                                user: data.user,
                                guild: data.guild,
                                loading: false,
                            });
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

                        api.on('updateGuildSettings', ({ data }) => {
                            this.setState({
                                guild: Object.assign((this.state as IState).guild as IGuildSuper, data),
                            });

                            setTimeout(() => {
                                buttonSave.removeClass(sendingClass);
                            }, 1000);
                        })

                        buttonSave.click(async function() {
                            if(!buttonSave.hasClass(sendingClass)) {
                                buttonSave.addClass(sendingClass);
                                
                                const json = saveJSON();

                                console.log(json)

                                api.emit('updateGuildSettings', {
                                    guildId,
                                    data: {
                                        updateType: 'moderation',
                                        settingsData: { ...json } 
                                    }
                                });
                            };
                        });

                        function saveJSON() {
                            const json = { config: 0 }

                            $('[data-send-on-save]').map(function() {
                                const a = $(this);
                                const id = a.attr('id');
                                const type = a.attr('data-type');
                                const value = a.attr('data-value');
                                
                                if(type == 'select') {
                                    json[`${id}`.replace('w-select-', '')] = value == "none" ?  null : value;
                                };
                                
                                if(type == 'bitfield') {
                                    if(a.is(':checked')) {
                                        json.config |= parseInt(value);
                                    }
                                };
                            });

                            return json;
                        } 
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
            guildId: ctx.query.guild || null,
        },
    };
}