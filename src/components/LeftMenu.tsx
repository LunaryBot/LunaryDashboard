import React from 'react';
import styles from '../styles/main.module.css';
import { IUser, IGuild } from '../types';
import Link from 'next/link';

interface IProps {
    user: IUser,
    guild?: IGuild
}

const _urls = {
    user: {
        general: [
            {
                name: 'Home',
                url: '/dashboard/@me',
                icon: 'fad fa-home'
            },
            {
                name: 'Servidores',
                url: '/dashboard/guilds',
                icon: 'fad fa-grip-vertical'
            }
        ]
    },
    guild: {
        general: [
            {
                name: 'Home',
                url: '/dashboard/guilds/[guild]/',
                icon: 'fad fa-home'
            },
            {
                name: 'Moderação',
                url: '/dashboard/guilds/[guild]/moderation',
                icon: 'fad fa-hammer'
            },
            {
                name: "Permissões",
                url: "/dashboard/guilds/[guild]/permissions",
                icon: "fad fa-briefcase"
            }
        ]
    }
} 

export default class Header extends React.Component {
    render() {
        const { user, guild = null } = this.props as IProps;

        const name = guild?.name || user?.username
        const id = guild?.id || user?.id
        const icon = guild ? guild?.icon : user?.avatar

        const urls = Object.entries(_urls[guild ? 'guild' : 'user']);
        
        function iconComponent() {
            if(icon) {
                return (
                    <img src={guild ? icon : `https://cdn.discordapp.com/avatars/${id}/${icon}.png`} alt='' />
                )
            } else {
                const a = /[a-z]/i
                const b = /\s[a-z]/i
                // @ts-ignore
                let array = [ ...(name || '') ]
                array = array.filter(function(x, i) {
                    if(i == 0) return true
                    if(!x.trim()) return
                    if(!a.test(x)) return true
                    if(b.test(`${array[i -1]}${x}`)) return true 
                })

                return (
                    <div>{array.join('')}</div>
                )
            }
        }
            

        return (
            <>
                <div className={styles['left-column']}>
                    <div className={styles['menu']}>
                        <div className={styles['user']}>
                            <span className={styles['avatar']}>
                                {iconComponent()}
                            </span>
                            <div className={styles['username']}>
                                <p>{name || '...'}</p>
                            </div>
                        </div>
                        {urls.map(([k, v]) => {
                            return (
                                <main key={k}>
                                    <p className={styles['stack']}>{k.toLocaleUpperCase()}</p>
                                    <div className={styles['border']}>
                                        {v.map(({ name, url, icon}) => {
                                            return (
                                                <a href={url.replace('[guild]', guild?.id)} className={styles['link']} key={url}>
                                                    <p><i className={icon}></i>{name}</p>
                                                </a>
                                            )
                                        })}
                                    </div>
                                </main>
                            )
                        })}

                        <div className={styles['save-button']} id={'save-button'}>
                            <i className={'fas fa-spinner-third'} />
                            <p>Salvar</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}