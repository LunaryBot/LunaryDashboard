import { Component } from "react";
import guildStyle from "../styles/guild.module.css";

interface PropsIE {
    avatar: string;
    user: string;
    data: string;
    reason: string;
    author: string;
}

export default class CardLog extends Component {
    render() {
        const { avatar, user, data, reason, author } = this.props as PropsIE;

        if (!avatar || !user || !data || !reason || !author) {
            return (
                <div className={guildStyle["cardLog"]}>
                    <div className={guildStyle["box"]}>
                        Argumentos faltando! Eu sou apenas um componente, não bola de cristal.
                    </div>
                </div>
            );
        }

        return (
            <div className={guildStyle["cardLog"]}>
                <div className={guildStyle["box"]}>
                    <div className={guildStyle["close"]}>
                        <button>
                            X
                        </button>
                    </div>
                    <div className={guildStyle["user"]}>
                        <img
                            src={avatar}
                            alt={"avatar-" + user}
                        />
                        <h3>{user}</h3>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className={guildStyle["line"]} />
                    <br />
                    <div className={guildStyle["grid"]}>
                        <div className={guildStyle["item"]}>
                            <span className={guildStyle["Text1"]}>Data da punição:</span>
                            <br />
                            <span className={guildStyle["Text2"]}>{data}</span>
                        </div>
                        <div className={guildStyle["item"]}>
                            <span className={guildStyle["Text1"]}>Autor da punição:</span>
                            <br />
                            <span className={guildStyle["Text2"]}>{author}</span>
                        </div>
                    </div>
                    <br />
                    <div className={guildStyle["reason"]}>
                        <span className={guildStyle["Text1"]}>Motivo da punição:</span>
                        <br />
                        <span className={`${guildStyle["Text2"]} ${guildStyle["reasonText"]}`}>
                            {reason}
                        </span>
                    </div>
                    <br />
                </div>
            </div>
        );
    }
}