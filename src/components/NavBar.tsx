import { Component } from 'react';
import Styles from '../styles/NavBar.module.css';

export default class NavBar extends Component {
    render() {
        return (
            <>
                <div className={Styles.container}>
                    <div className={Styles.box}>
                        <div className={`${Styles.content} ${Styles.firstContentBox}`}>
                            <img 
                                src='https://images-ext-1.discordapp.net/external/9v1spCjx1AnB9D2-OiSEvSzrXpORzx8gScClAcMhX_A/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/807225861769396225/60bab4386da65e5332379ddd2461e834.png' 
                                width={"44px"}
                                style={{
                                    marginTop: '5px',
                                    borderRadius: '200px'
                                }}
                            />
                        </div>
                        <div className={`${Styles.content} ${Styles.secondContentBox}`}>
                            <button
                                className={Styles.loginButton}
                            >
                                <i className="fas fa-sign-in-alt" />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}