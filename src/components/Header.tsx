import React from 'react';
import styles from '../styles/Header.module.css';
import { IUser} from '../types';
import { defaultAvatar } from '../Constants';
import Link from 'next/link';

interface IProps {
    user: IUser
}

export default class Header extends React.Component {
    componentDidMount() {
        function changeCss () {
            const header: HTMLElement = document.querySelector("header") as HTMLElement;

            if(this.scrollY == 0) {
                header.classList.add(styles["onTop"])
            } else {
                header.classList.remove(styles["onTop"])
            }
        }
          
        window.addEventListener("scroll", changeCss , { passive: true });
        const avatar = document.getElementById("avatar") as HTMLElement;
        avatar.addEventListener("click", (e) => {
            console.log('click')
            avatar.classList.toggle(styles["openMenu"])
        })
        
        window.addEventListener('click', (e: any) => {
            if(!avatar.contains(e.target)) {
                if([ ...(avatar.classList.values() as any) ].includes(styles["openMenu"])) {
                    avatar.classList.remove(styles["openMenu"])
                }
            }
        })
    }

    render() {
        const { user } = this.props as IProps;

        return (
            <header className={styles["header"] + " " + styles["onTop"]}>
                <a href='/'>
                    <svg
                        className={styles["icon"]} 
                        version="1.1" 
                        id="Layer_1" 
                        xmlns="http://www.w3.org/2000/svg" 
                        xmlnsXlink="http://www.w3.org/1999/xlink" 
                        x="0px" 
                        y="0px" 
                        viewBox="0 0 122.88 122.89" 
                        xmlSpace="preserve"
                    >
                        <g>
                            <path 
                                d="M49.06,1.27c2.17-0.45,4.34-0.77,6.48-0.98c2.2-0.21,4.38-0.31,6.53-0.29c1.21,0.01,2.18,1,2.17,2.21 c-0.01,0.93-0.6,1.72-1.42,2.03c-9.15,3.6-16.47,10.31-20.96,18.62c-4.42,8.17-6.1,17.88-4.09,27.68l0.01,0.07 c2.29,11.06,8.83,20.15,17.58,25.91c8.74,5.76,19.67,8.18,30.73,5.92l0.07-0.01c7.96-1.65,14.89-5.49,20.3-10.78 c5.6-5.47,9.56-12.48,11.33-20.16c0.27-1.18,1.45-1.91,2.62-1.64c0.89,0.21,1.53,0.93,1.67,1.78c2.64,16.2-1.35,32.07-10.06,44.71 c-8.67,12.58-22.03,21.97-38.18,25.29c-16.62,3.42-33.05-0.22-46.18-8.86C14.52,104.1,4.69,90.45,1.27,73.83 C-2.07,57.6,1.32,41.55,9.53,28.58C17.78,15.57,30.88,5.64,46.91,1.75c0.31-0.08,0.67-0.16,1.06-0.25l0.01,0l0,0L49.06,1.27 L49.06,1.27z"
                            />
                        </g>
                    </svg>
                </a>
            
                <div className={styles["links"]}>
                    <a href="" className={styles["link"]}>Comandos</a>
                    <a href="" className={styles["link"]}>Invite</a>
                    <a href="" className={styles["link"]}>Vote</a>
                </div>
                <div id="avatar" className={styles["avatar"]}>
                    <img src={user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png` : defaultAvatar} alt="" />
                    <div className={styles["user-menu-wrapper"]}>
                        <div className={styles["user-menu"]}>
                            <div className={styles["user-menu-options"]}>
                                <a href={"/dashboard/@me"}>
                                    <div style={{marginTop: "0"}}>
                                        <i className={"fas fa-tools"}></i>
                                        Dashboard
                                    </div>
                                </a>
                                <a href={"/commands"}>
                                    <div>
                                        <i className={"fas fa-project-diagram"}></i>
                                        Comandos
                                    </div>
                                </a>
                                <a href={"/api/auth/logout"}>
                                    <div>
                                        <i className={"fas fa-sign-out-alt"} style={{color: "var(--luny-colors-red)"}}></i>
                                        Logout
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}