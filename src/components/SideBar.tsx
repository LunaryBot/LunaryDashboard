import React, { useEffect } from 'react';
import Script from 'next/script';
import { URLS } from '../utils/Constants';
import Link from 'next/link';

interface IState {
    sidebarOpened: boolean;
    urls: {
        [category: string]: { url: string; label: string, icon: string }[];
    };
}

class SideBar extends React.Component {
    public state: IState;
    constructor(props: { urlsType: 'USER' }) {
        super(props);

        this.state = {
            sidebarOpened: true,
            urls: URLS[props.urlsType]
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
    render() {
        return (
            <>
                <nav className={'sidebar close'}>
                    <header>
                        <div className={'container'}>
                            <span className={'image'}>
                                <img src='https://github.com/jvopinho.png' alt='' />
                            </span>

                            <div className={'text text'}>
                                <span className={'name'}>Bae.</span>
                                <span className={'id'}>452618703792766987</span>
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
                                                <Link href={url.url}>
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