import React, { useEffect } from 'react';
import Script from 'next/script';
import { URLS } from '../utils/Constants';
import Link from 'next/link';
import { IGuildData, IUser } from '../@types';
import Utils from '../utils/Utils';
import APIUtils from '../utils/APIUtils';
import Dots from '../components/Dots';

interface IState {
    sidebarOpened: boolean;
    sidebarServersMenuOpened: boolean;
    urls: {
        [category: string]: { url: string; label: string, icon: string }[];
    };
    user: IUser;
    guild: IGuildData | null;
    guilds: IGuildData[];
}

class SideBar extends React.Component {
    public state: IState;
    private api: APIUtils;

    constructor(props: { urlsType: 'USER' | 'GUILD', user: IUser, guild?: IGuildData, api: APIUtils }) {
        super(props);

        this.state = {
            sidebarOpened: true,
            sidebarServersMenuOpened: false,
            urls: URLS[props.urlsType || 'USER'],
            user: props.user,
            guild: props.guild || null,
            guilds: null,
        }

        this.api = props.api;
    }
    componentDidMount() {
        const body = document.querySelector('body'),
            sidebar = body.querySelector('nav'),
            toggle = body.querySelector('.toggle'),
            searchBtn = body.querySelector('.searchBox'),
            modeSwitch = body.querySelector('.sunMoon'),
            modeIcon = body.querySelector('.modeIcon') as HTMLElement,
            userInfo = body.querySelector('.userInfo') as HTMLElement,
            serversMenu = body.querySelector('.serversMenu') as HTMLElement;
            
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

        document.addEventListener('click', (e) => {
            if(this.state.sidebarServersMenuOpened && !serversMenu.contains(e.target as Node) && !userInfo.contains(e.target as Node)) {
                this.toggleServersMenu();
            }
        });
    }

    async componentDidUpdate(_, prevState: IState) {
        if(prevState.sidebarServersMenuOpened !== this.state.sidebarServersMenuOpened && this.state.sidebarServersMenuOpened && !this.state.guilds) {
            const guilds = await this.api.guilds();

            console.log(guilds);

            this.setState({ guilds });

            const serversMenu = document.querySelector('.serversMenuContent') as HTMLElement;
            const selected = serversMenu.querySelector(`[data-guild="${this.guild?.id || this.user?.id}"]`) as HTMLElement;

            if(selected) {
                serversMenu.scrollTop = selected.offsetTop - serversMenu.offsetTop;
            }
        }
    }
    
    toggleServersMenu() {
        this.setState({ sidebarServersMenuOpened: !this.state.sidebarServersMenuOpened });
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
                            {this.state.user || this.state.guild ? (
                                <div className={'userInfo'} onClick={() => this.toggleServersMenu()} data-opened={this.state.sidebarServersMenuOpened}>
                                    <span className={'image'}>
                                        {this.guild ? ( this.guild?.icon ? <img src={Utils.getGuildIcon(this.guild, { size: 1024, dynamic: true })} /> : (<div>{Utils.stringAcronym(this.guild.name)}</div>)) : ( <img src={Utils.getUserAvatar(this.user, { size: 1024, dynamic: true })} /> )}
                                    </span>

                                    <div className={'text'} style={{marginLeft: '10px'}}>
                                        <span className={'name'}>{this.guild?.name || this.user?.username}</span>
                                        <span className={'id'}>{this.guild?.id || this.user?.id}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className={'userInfo'}>
                                    <Dots />
                                </div>
                            )}

                            <section className={'serversMenu'} data-opened={this.state.sidebarServersMenuOpened}>
                                <div className={'serversMenuContent'}>
                                    <ul>
                                        <li data-guild={this.user?.id} data-selected={!this.guild}>
                                            <Link href={'/dashboard/@me'}>
                                                <a>
                                                    <div className={'server'}>
                                                        <span className={'image'}>
                                                            <img src={Utils.getUserAvatar(this.user, { size: 1024, dynamic: true })} />
                                                        </span>

                                                        <span className={'text'}>
                                                            <span className={'name'}>{this.user?.username}</span>
                                                        </span>
                                                    </div>
                                                </a>
                                            </Link>  
                                        </li>

                                        <hr />
                                        {this.state.guilds?.filter(guild => guild.access)?.map(guild => (
                                            <li key={guild.id} data-guild={guild.id} data-selected={[this.guild?.id || this.user?.id].includes(guild.id)}>
                                                    <Link href={`/dashboard/guilds/${guild.id}`}>
                                                        <a>
                                                            <div className={'server'}>
                                                                <span className={'image'}>
                                                                    {guild?.icon ? <img src={Utils.getGuildIcon(guild, { size: 1024, dynamic: true })} /> : (<div>{Utils.stringAcronym(guild.name)}</div>)}
                                                                </span>

                                                                <span className={'text'}>
                                                                    <span className={'name'}>{guild?.name}</span>
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </Link>  
                                            </li>
                                        )) ?? (<Dots/>)}
                                        <hr />

                                        <li className={'invite'}>
                                            <Link href={'/invite'}>
                                                <a>
                                                    <div className={'server'}>
                                                        <span className={'image'}>
                                                            <img src={'https://imgur.com/xCIgS2n.png'} style={{borderRadius: '0'}} />
                                                        </span>

                                                        <span className={'text'}>
                                                            <span className={'name'}>Invite</span>
                                                        </span>
                                                    </div>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </section>
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