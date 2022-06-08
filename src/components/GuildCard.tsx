import { Component } from 'react';
import { IGuildData } from '../@types';
import Styles from '../styles/GuildCard.module.css';
import Utils from '../utils/Utils';
import Link from 'next/link';

const ownerIcon = (
    <svg 
        aria-hidden={'false'} 
        width={'24'} 
        height={'24'} 
        viewBox={'0 0 16 16'}
        fill={'#faa81a'}
    >
        <path 
            fill={'#faa81a'}
            fill-rule={'evenodd'} 
            clip-rule={'evenodd'} 
            d={'M13.6572 5.42868C13.8879 5.29002 14.1806 5.30402 14.3973 5.46468C14.6133 5.62602 14.7119 5.90068 14.6473 6.16202L13.3139 11.4954C13.2393 11.7927 12.9726 12.0007 12.6666 12.0007H3.33325C3.02725 12.0007 2.76058 11.792 2.68592 11.4954L1.35258 6.16202C1.28792 5.90068 1.38658 5.62602 1.60258 5.46468C1.81992 5.30468 2.11192 5.29068 2.34325 5.42868L5.13192 7.10202L7.44592 3.63068C7.46173 3.60697 7.48377 3.5913 7.50588 3.57559C7.5192 3.56612 7.53255 3.55663 7.54458 3.54535L6.90258 2.90268C6.77325 2.77335 6.77325 2.56068 6.90258 2.43135L7.76458 1.56935C7.89392 1.44002 8.10658 1.44002 8.23592 1.56935L9.09792 2.43135C9.22725 2.56068 9.22725 2.77335 9.09792 2.90268L8.45592 3.54535C8.46794 3.55686 8.48154 3.56651 8.49516 3.57618C8.51703 3.5917 8.53897 3.60727 8.55458 3.63068L10.8686 7.10202L13.6572 5.42868ZM2.66667 12.6673H13.3333V14.0007H2.66667V12.6673Z'} 
            aria-hidden={'true'} 
        />
    </svg>
);

const administratorIcon = (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        style={{width: '30px', height: '30px'}} 
        viewBox="0 0 24 24"
    >
        <path 
            fill="#5865f2" 
            d="M17.2719 3H7.72807C7.57895 4.9386 5.9386 6.42982 4 6.42982v.89474C4 11.7237 6.08772 15.8246 9.74123 18.7325L12.5 20.8947l2.7588-2.1622C18.9123 15.8991 21 11.7237 21 7.32456v-.89474c-1.9386 0-3.5044-1.49122-3.7281-3.42982zm-6.4868 12.8991c-2.23685-1.7895-3.57896-4.3245-3.57896-7.08331v-.52193c1.19298 0 2.23684-.89474 2.3114-2.08772H12.5V17.3158z"
        />
    </svg>
);

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
                <span className={Styles.rankIcon}>
                        {this.state.owner ? ownerIcon : administratorIcon}
                    </span>
                    <span className={Styles.favoriteIcon} data-value={`${this.state.favorite || false}`} onClick={() => window.toggleFavorite?.(this.state.id)}>
                        <i className={`${this.state.favorite ? 'fa' : 'far'} fa-star`} />
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
                                {this.state.access ? 'Configurar' : 'Adicionar'}
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default GuildCard;