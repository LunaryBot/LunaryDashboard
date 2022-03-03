import React from 'react';
import Script from 'next/script';
import { GetServerSideProps } from 'next'
import socket from 'socket.io-client';
import { parseCookies } from 'nookies';

import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from '../styles/commands.module.css';

import { IUser } from '../types';

import _commands from '../../public/json/commands.json';

const constants = {
    "userID": "822470491574763580",
    "user-tag": "Pinho#1856",
    "@user": "@Pinho",
    "reason": "Regra 13: É biscoito, bobo",
    "notify-dm": "False",
    "time": "1h30m",
    "amountClear": "132",
    "amount": "3",
    "id": "mhjr44cg-f1yu-0o2d-8wxq-m3n56kbgwp",
    "newreason": "É biscoito, bobinho",
    "channel": "#general"
}
  
const categorys = {
    "moderation": {
        name: "Moderação",
        color: "#ff7373",
    },
    "administration": {
        name: "Administração",
        color: '#fcb75c',
    },
    "utilities": {
        name: "Utilitarios",
        color: "#fd87b0"
    },
    "bot": {
        name: "Luny",
        color: "#A020F0"
    },
    "owner": {
        name: "Owner",
        color: "#c07aec"
    }
}

interface IState {
    user: IUser | null;
    category: string|null;
    search: string|null;
    commands: any[];
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
            category: null,
            search: null,
            commands: _commands.commands
        } as IState;
    }

    render() {
        const { user, category, commands, search } = this.state as IState;
        const { token, hostApi } = this.props as IProps;

        return (
            <>
                <Header {...{user}}/>

                <div className={styles['content-commands']}>
                    <div className={styles['content-commands-container']}>
                        <div className={styles['content-commands-column-1']}>
                            <p>
                                Os comandos marcados com tags <kbd className={styles['code-style-inline-blue']}>Azuis</kbd> requerem a respectiva permissão do Discord que ele destaca.<br />
                                Os comandos marcados com tags <kbd className={styles['code-style-inline-purple']}>Roxas</kbd> requerem a respectiva permissão do SPA(Sistema de Permissões Avançadas) que ele destaca.<br />
                                Os comandos marcados com tags <kbd className={styles['code-style-inline-red']}>Vermelhas</kbd> requerem que eu tenha respectiva permissão do Discord que ele destaca.<br />
                                Os comandos marcados com a tag <kbd className={styles['code-style-inline-green']}>Everyone</kbd> não requerem nenhuma permissão.
                            </p>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className={styles['content-commands-column-2']}>
                                <div className={styles['content-commands-column-2-left']}>
                                    <h1>Grupos</h1>
                                    <div className={styles['content-commands-expand']}>
                                        <p> Mostrar &frasl; Esconder todos </p>
                                        <div className={styles['switch']}>
                                            <input type="checkbox" id={'checkbox-expand'} />
                                            <span className={styles['slider']}></span>
                                        </div>
                                    </div>

                                    <ul className={styles['qa-menu-list']}>
                                        {Object.entries(categorys).map(([key, {name}]) => {
                                            return (
                                                <li data-li={key} className={`${styles['col-2-btn']} ${category == key ? `${styles['active']}` : ''}`} key={key}>{name}</li>
                                            )
                                        })}
                                    </ul>
                                </div>

                                <div className={styles['content-commands-column-2-right']}>
                                    <div className={styles['commands-search']}>
                                        <input id={'search-box'} type={'text'} name={'command'} defaultValue={search || ''} required onKeyUp={(e) => {
                                            // @ts-ignore
                                            window.searchCommand(e.currentTarget.value || '');
                                        }} />
                                        <label htmlFor={'search'} className={styles['search-label']}>
                                            <span className={styles['content-search']}> Pesquisar </span>
                                        </label>
                                    </div>
                                    <div className={styles['commands']} id={'commands-list'}>
                                        {(() => {
                                            if(!commands) {
                                                return ( <div className={styles['commands-still-loading']} /> )
                                            }

                                            try {
                                                return (
                                                    <>
                                                        {commands.map((command) => (
                                                            <div className={`${styles['command']} ${command.group}`} data-name={command.name} key={command.name}>
                                                                <div className={styles['command-heading']}>
                                                                    <div 
                                                                        className={`${styles['group-icon']} group-for-${command.name.replace(/ +/g, "_")}`}
                                                                        style={{backgroundColor: categorys[command.group]?.color || 'var(--luny-colors-band-100'}}
                                                                    >
                                                                        <strong>{categorys[command.group]?.name || 'No group'}</strong>
                                                                    </div>

                                                                    <div className={styles['command-heading-left']}>
                                                                        <div className={styles['arrow-icon']}>
                                                                            <svg aria-hidden="true" role="img" viewBox="0 0 320 512" className={styles['icon-expand']}>
                                                                                <path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
                                                                            </svg>
                                                                        </div>
                                                                        <h1>{command.name}</h1>
                                                                    </div>
                                                                </div>

                                                                <div className={`${styles['command-details']} ${command.name.replace(/ +/g, "_")}-1`}>
                                                                    <p>
                                                                        {String(command.description)}
                                                                        <br />
                                                                        {command.dm && (<span className={styles['code-style-inline-red']}>Bloqueado em DM</span>)}
                                                                        {command.userDiscordPermissions?.map(x => {
                                                                            return (<span key={x} className={styles['code-style-inline-blue']}>{x.split('_').map(p=>p.charAt(0).toUpperCase()+p.slice(1).toLowerCase()).join(' ')}</span>)
                                                                        }) || (<span className={styles['code-style-inline-green']}>Everyone</span>)}
                                                                        {command.botUserPermissions?.map(x => {
                                                                            return (<span key={x} className={styles['code-style-inline-purple']}>{x.split('_').map(p=>p.charAt(0).toUpperCase()+p.slice(1).toLowerCase()).join(' ')}</span>)
                                                                        })}
                                                                        {command.lunyDiscordPermissions?.map(x => {
                                                                            return (<span key={x} className={styles['code-style-inline-red']}>{x.split('_').map(p=>p.charAt(0).toUpperCase()+p.slice(1).toLowerCase()).join(' ')}</span>)
                                                                        })}
                                                                        <br />
                                                                        <br />
                                                                        <br />
                                                                        <h3>Exemplos&frasl;s:</h3>
                                                                        {command.examples ? 
                                                                            Array.isArray(command.examples) ?
                                                                                command.examples.map(x => (
                                                                                    x.name || x.title ?
                                                                                        <main key={x.name || x.title}>
                                                                                            <strong>{x.name || x.title}</strong>
                                                                                            <br />
                                                                                            <code>&frasl;{command.name} {replaceUsage(x.usage)}</code>
                                                                                        </main>
                                                                                    : <code>&frasl;{command.name} {replaceUsage(x)}</code>
                                                                                ))
                                                                            : <code>&frasl;{command.name} {replaceUsage(command.examples)}</code>
                                                                        : <code>&frasl;{command.name}</code>
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </>
                                                )
                                            } catch(e) {
                                                return (
                                                    <div className={styles['commands-loading-failed']}>
                                                        <h1>Error: Unable to Load Commands</h1>
                                                    </div>
                                                )
                                            }

                                        })()}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />

                <Script
                    src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
                    defer
                    onLoad={() => {
                        const params = new URLSearchParams(location.search);
                        const category = params.get('category') || null
                        const search = params.get('seach') || params.get('s') || null;

                        this.setState({
                            category,
                            search,
                        });
                        
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

                        $(`.${styles['commands-still-loading']}`).hide();
                        if(categorys[params.get('category') as string]) { 
                            $(`.${styles['command']}`).hide();
                            $(`.${styles['command']}.${params.get('category')}`).show();
                        }
                        $('.Moderação').show();
                        $(`.${styles['command-details']}`).hide();
                        $(`.${styles['clock-icon']}`).hide();

                        $(`.${styles['col-2-btn']}`).click(function() {
                            $(`.${styles['col-2-btn']}`).removeClass(styles['active']);

                            $(this).addClass(styles['active']);

                            $('#search-box').val('');

                            const attr = $(this).attr('data-li');

                            $(`.${styles['command']}`).hide();
                            $(`.${attr}`).show();
                        });

                        $('#checkbox-expand').change(function(){
                            if($(this).is(':checked')) {
                                $(`.${styles['command-details']}`).slideDown(300);
                                $(`.${styles['clock-icon']}`).show();
                            } else {
                                $(`.${styles['command-details']}`).slideUp(300);
                                $(`.${styles['clock-icon']}`).hide();
                            };
                        });

                        $(`.${styles['command']}`).click(function() {
                            const attr = $(this).attr('data-name').replace(/ +/g, "_");
                            
                            $(`.clock-for-${attr}`).toggle(300);
                            $(`.${attr}-1`).slideToggle(300);
                        });

                        // @ts-ignore
                        window.searchCommand = (search: string) => {
                            const value = String(search).toLowerCase().trim();
                            if(!value) {
                                const attr = $(`.${styles['col-2-btn']}.${styles['active']}`).attr('data-li');
                                $(`.${styles['command']}`).hide();
                                $(`.${attr}`).show();
                                return;
                            };
    
                            const commandsDiv = $(`.${styles['commands']} div`) as any;
                            commandsDiv.filter(function(_,el) {
                                if(!$(el).hasClass(styles['command'])) { return; };
                                $(this).toggle($(this).attr('data-name').toLowerCase().trim().indexOf(value)>-1)
                            });
                        };

                        if(search) {
                            // @ts-ignore
                            window.searchCommand(search);
                        };
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

function replaceUsage(string) {
    if(string) {
        Object.entries(constants).forEach(([key, value]) => {
            string = string.replace(new RegExp(`{${key}}`, 'g'), value);
        });
    }
  
    return string;
}