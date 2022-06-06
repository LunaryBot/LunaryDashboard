import { Component } from "react";
import Styles from "../styles/GuildCard.module.css";

class GuildCard extends Component {
    render() {
        return <>
            <div className={Styles.guildCard}>
                <div className={Styles.guildImage}>
                    <span className={Styles.firstIcon}>
                        <i className='far fa-star' />
                    </span>
                    <span className={Styles.secondIcon}>
                        <i className='far fa-star' />
                    </span>
                    <div 
                        className={Styles.blur} 
                        style={{ backgroundImage: `url(https://cdn.discordapp.com/avatars/522752913794138112/9f81dd922901d2108219c9960ecf86f4.png)` }} 
                    />
                    
                    <img
                        src={"https://cdn.discordapp.com/avatars/522752913794138112/9f81dd922901d2108219c9960ecf86f4.png"}
                        alt={''}
                    />
                    
                </div>
                <div className={Styles.infos}>
                    <h3
                        style={{
                            color: 'white',
                            fontWeight: '500',
                            marginBottom: '15px'
                        }}
                    >
                        Teste
                    </h3>
                    <div className={Styles.btnGrid}>
                        <a href={`/dashboard/guilds/`}>
                            <i className='fas fa-wrench'style={{ marginRight: '5px' }} />
                            Configurar
                        </a>
                        <a href={`/dashboard/guilds/`}>
                            <i className='fas fa-wrench'style={{ marginRight: '5px' }} />
                            Configurar
                        </a>
                    </div>
                </div>
            </div>
        </>
    }
}

export default GuildCard;