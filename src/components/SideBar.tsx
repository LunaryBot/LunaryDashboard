import React, { useEffect } from 'react';
import Script from 'next/script';
import { URLS } from '../utils/Constants';
import Link from 'next/link';
import { IGuildData, IUser } from '../@types';
import Utils from '../utils/Utils';

interface IState {
    sidebarOpened: boolean;
    urls: {
        [category: string]: { url: string; label: string, icon: string }[];
    };
    user: IUser;
    guild: IGuildData | null;
}

class SideBar extends React.Component {
    public state: IState;
    constructor(props: { urlsType: 'USER', user: IUser, guild?: IGuildData }) {
        super(props);

        this.state = {
            sidebarOpened: true,
            urls: URLS[props.urlsType],
            user: props.user,
            guild: props.guild || null
        };
    }
    componentDidMount() {
        const body = document.querySelector('body'),
            sidebar = body.querySelector('nav'),
            toggle = body.querySelector('.toggle'),
            searchBtn = body.querySelector('.searchBox'),
            modeSwitch = body.querySelector('.sunMoon'),
            modeIcon = body.querySelector('.modeIcon') as HTMLElement;
            
            localStorage.getItem('sidebarOpened') === 'true' ? sidebar.classList.remove('close') : sidebar.classList.add('close');

            modeIcon.classList[localStorage.getItem('mode') == 'light' ? 'add' : 'remove']('fa-moon');
            modeIcon.classList[localStorage.getItem('mode') == 'dark' ? 'add' : 'remove']('fa-sun');
            
        toggle.addEventListener('click' , () => {
            const state = sidebar.classList.toggle('close');

            localStorage.setItem('sidebarOpened', `${!state}`);
        })
            
        searchBtn?.addEventListener('click' , () => {
            sidebar.classList.remove('close');
        })
            
        modeSwitch?.addEventListener('click' , () => {
            let mode = 'light';
            
            if(localStorage.getItem('mode') === 'light') {
                mode = 'dark';
            }

            window.changeMode(mode as 'dark' | 'light');

            modeIcon.classList[mode == 'light' ? 'add' : 'remove']('fa-moon');
            modeIcon.classList[mode == 'dark' ? 'add' : 'remove']('fa-sun');
        });
    }

    get user() {
        return this.state.user;
    }

    get guild() {
        return this.state.guild;
    }

    render() {
        return (
            <>
                <nav className={'sidebar close'}>
                    <header>
                        <div className={'container'}>
                            <span className={'image'}>
                                {this.guild ? ( this.guild?.icon ? <img src={Utils.getGuildIcon(this.guild, { size: 1024, dynamic: true })} /> : (<div>{Utils.stringAcronym(this.guild.name)}</div>)) : ( <img src={Utils.getUserAvatar(this.user, { size: 1024, dynamic: true })} /> )}
                            </span>

                            <div className={'text'}>
                                <span className={'name'}>{this.guild?.name || this.user?.username}</span>
                                <span className={'id'}>{this.guild?.id || this.user?.id}</span>
                            </div>
                        </div>

                        <i className={'bx bx-chevron-right toggle'} />
                    </header>

                    <div className={'menuBar'}>
                        <div className={'menu'}>

                            {/* <li className={'searchBox'}>
                                <i className={'fas faSearch icon'} />
                                <input type='text' placeholder='Search...' />
                            </li> */}

                            <ul className={'menuLinks'}>
                                {Object.entries(this.state.urls).map(([category, urls], index) => (
                                    <div key={index.toString()}>
                                        <li className={'navLink'}>
                                            <span className={'text'}>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</span>
                                        </li>

                                        {urls.map((url, index) => (
                                            <li className={'navLink'} key={`${category}-${index}`}>
                                                <Link href={url.url.replace(/\[guild]/ig, this.guild?.id)}>
                                                    <a>
                                                        <i className={`${url.icon} icon`} />
                                                        <span className={'text'}>{url.label}</span>
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                    </div>
                                ))}
                            </ul>
                        </div>
                        <div className={'bottomContent'}>
                            <hr />
                            <li className={'discord'}>
                                <a href='#'>
                                    <i className={'fab fa-discord icon'} />
                                    <span className={'text navText'}>Suporte</span>
                                </a>
                            </li>

                            <li className={'mode'}>
                                <div className={'sunMoon'}>
                                    <i className={'far fa-moon icon modeIcon'} />
                                </div>
                            </li>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

export default SideBar;