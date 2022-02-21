import { Component } from "react";
import styles from '../styles/main.module.css';

interface PropsIE {
    name: string;
    icon: string;
    id: string;
};

export class GuildCard extends Component {
    render() {
        const { name, icon, id } = this.props as PropsIE;

        if (!name || !icon || !id) {
            return (
                <>
                    <h3
                        style={{
                            color: "white"
                        }}
                    >
                        Argumentos faltando em GuildCard!
                    </h3>
                </>
            );
        }

        return (
            <>
                <div className={styles["guild-card"]}>
                    <div className={styles["guildImage"]}>
                        <div 
                            className={styles["blur"]} 
                            style={{ backgroundImage: `url(${icon})` }} 
                        />
                        <img
                            src={icon}
                            alt={name}
                        />
                    </div>
                    <div className={styles["infos"]}>
                        <h3
                            style={{
                                color: "white",
                                fontWeight: "500",
                                marginBottom: "15px"
                            }}
                        >
                            {name}
                        </h3>
                        <a href={`/dashboard/guilds/${id}/moderation`}>
                            <i className="fas fa-wrench"style={{ marginRight: "5px" }} />
                            Configurar
                        </a>
                    </div>
                </div>
            </>
        );
    }
}