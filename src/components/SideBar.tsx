import React, { useEffect } from 'react';
import Script from 'next/script';

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sidebarOpened: true
        };
    }
    componentDidMount() {
        const body = document.querySelector('body'),
            sidebar = body.querySelector('nav'),
            toggle = body.querySelector(".toggle"),
            searchBtn = body.querySelector(".search-box"),
            modeSwitch = body.querySelector(".toggle-switch"),
            modeText = body.querySelector(".mode-text") as HTMLElement;
            
            localStorage.getItem('sidebarOpened') === 'true' ? sidebar.classList.remove("close") : sidebar.classList.add("close");
            
        toggle.addEventListener("click" , () => {
            const state = sidebar.classList.toggle("close");

            localStorage.setItem('sidebarOpened', `${!state}`);
        })
            
        searchBtn?.addEventListener("click" , () => {
            sidebar.classList.remove("close");
        })
            
        modeSwitch.addEventListener("click" , () => {
            let mode = "light";
            
            if(localStorage.getItem('mode') === 'light') {
                mode = "dark";
            }

            window.changeMode(mode as 'dark' | 'light');

            modeText.innerText = `${mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase()} mode`;
        });
    }
    render() {
        return (
            <>
                <nav className="sidebar close">
                    <header>
                        <div className="image-text">
                            <span className="image">
                                <img src="https://github.com/jvopinho.png" alt="" />
                            </span>

                            <div className="text logo-text">
                                <span className="name">Bae.</span>
                                <span className="profession">452618703792766987</span>
                            </div>
                        </div>

                        <i className='bx bx-chevron-right toggle' />
                    </header>

                    <div className="menu-bar">
                        <div className="menu">

                            {/* <li className="search-box">
                                <i className='fas fa-search icon' />
                                <input type="text" placeholder="Search..." />
                            </li> */}

                            <ul className="menu-links">
                                <li className="nav-link">
                                    <a href="#">
                                        <i className='bx bx-home-alt icon'  />
                                        <span className="text nav-text">Dashboard</span>
                                    </a>
                                </li>

                                <li className="nav-link">
                                    <a href="#">
                                        <i className='bx bx-bar-chart-alt-2 icon'  />
                                        <span className="text nav-text">Revenue</span>
                                    </a>
                                </li>

                                <li className="nav-link">
                                    <a href="#">
                                        <i className='bx bx-bell icon' />
                                        <span className="text nav-text">Notifications</span>
                                    </a>
                                </li>

                                <li className="nav-link">
                                    <a href="#">
                                        <i className='bx bx-pie-chart-alt icon'  />
                                        <span className="text nav-text">Analytics</span>
                                    </a>
                                </li>

                                <li className="nav-link">
                                    <a href="#">
                                        <i className='bx bx-heart icon'  />
                                        <span className="text nav-text">Likes</span>
                                    </a>
                                </li>

                                <li className="nav-link">
                                    <a href="#">
                                        <i className='bx bx-wallet icon'  />
                                        <span className="text nav-text">Wallets</span>
                                    </a>
                                </li>

                            </ul>
                        </div>

                        <div className="bottom-content">
                            <li className="logout">
                                <a href="#">
                                    <i className="far fa-sign-out icon" />
                                    <span className="text nav-text">Logout</span>
                                </a>
                            </li>

                            <li className="mode">
                                <div className="sun-moon">
                                    <i className='far fa-moon icon moon' />
                                    <i className='far fa-sun icon sun' />
                                </div>
                                <span className="mode-text text">Dark mode</span>

                                <div className="toggle-switch">
                                    <span className="switch"></span>
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