import { Component } from 'react';
import { IGuildData } from '../@types';
import Styles from '../styles/GuildCard.module.css';
import Utils from '../utils/Utils';
import Link from 'next/link';

class GuildCard extends Component {
    state: IGuildData;
    
    constructor(props: IGuildData) {
        super(props);

        this.state = {...props};
    }
    
    render() {
        return (
            <div className={Styles.guildCard}>
                <div className={Styles.guildImage}>
                    <span className={Styles.firstIcon}>
                        <i className='far fa-star' />
                    </span>
                    <span className={Styles.secondIcon}>
                        <i className='far fa-star' />
                    </span>
                    
                    {this.state.icon ? <img src={Utils.getGuildIcon(this.state, { size: 1024, dynamic: true })} /> : (<div>{Utils.stringAcronym(this.state.name)}</div>)}
                    
                </div>
                <div className={Styles.infos}>
                    <h3
                        style={{
                            color: 'white',
                            fontWeight: '500',
                            marginBottom: '15px'
                        }}
                    >
                        {this.state.name}
                    </h3>
                    <div className={Styles.btnGrid}>
                        <Link href={`${this.state.access ? '/dashboard/guilds/' : '/invite?guild='}${this.state.id}`}>
                            <a>
                                <i className='fas fa-wrench'style={{ marginRight: '5px' }} />
                                Configurar
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default GuildCard;