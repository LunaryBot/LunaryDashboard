import React from 'react';
import styles from '../styles/Header.module.css';
import { IUser} from '../types';

interface IProps {
    user: IUser
}

export default class Header extends React.Component {
    componentDidMount() {
        console.log('a')
        function changeCss () {
            const header: HTMLElement = document.querySelector("header") as HTMLElement;

            if(this.scrollY == 0) {
                header.classList.add(styles["onTop"])
            } else {
                header.classList.remove(styles["onTop"])
            }
        }
          
        window.addEventListener("scroll", changeCss , { passive: true });
    }

    render() {
        const { user } = this.props as IProps;

        return (
            <header className={styles["header"] + " " + styles["onTop"]}>
                <div className={styles["header-wrapper"]}>
                    <div className={styles["avatar"]}>
                        <img src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`} alt="" />
                    </div>
                </div>
            </header>
        )
    }
}