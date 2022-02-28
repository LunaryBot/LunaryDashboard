import { Component } from 'react';

import styles from '../styles/GuildCard.module.css';

import { IGuildData } from '../types';
import { defaultAvatar } from '../Constants';

interface IProps {
    guild: IGuildData;
};

export default class GuildCard extends Component {
    render() {
        const { guild } = this.props as IProps;

        return (
            <>
                <div className={styles['guild-card']}>
                    <div className={styles['guildImage']}>
                        <div 
                            className={styles['blur']} 
                            style={{ backgroundImage: `url(${guild?.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith('a_') && guild.features.find(f => f == 'ANIMATED_ICON') ? 'gif' : 'png'}` : defaultAvatar})` }} 
                        />
                        <img
                            src={guild?.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith('a_') && guild.features.find(f => f == 'ANIMATED_ICON') ? 'gif' : 'png'}` : defaultAvatar}
                            alt={''}
                        />
                    </div>
                    <div className={styles['infos']}>
                        <h3
                            style={{
                                color: 'white',
                                fontWeight: '500',
                                marginBottom: '15px'
                            }}
                        >
                            {guild?.name}
                        </h3>
                        <a href={`/dashboard/guilds/${guild.id}/`}>
                            <i className='fas fa-wrench'style={{ marginRight: '5px' }} />
                            Configurar
                        </a>
                    </div>
                </div>
            </>
        );
    }
}