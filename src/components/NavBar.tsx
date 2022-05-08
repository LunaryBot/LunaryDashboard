import { Component } from 'react';

export default class NavBar extends Component {
    componentDidMount() {
        const dropdowns = document.querySelectorAll('[data-dropdown]');
        const user = document.querySelector('.user');
        const userMenu = document.querySelector('.user .menu');

        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('open');
            });

            document.addEventListener('click', () => {
                dropdown.classList.remove('open');
            });
        });

        user.addEventListener('click', (e) => {
            e.stopPropagation();

            userMenu.classList.toggle('open');

            document.addEventListener('click', () => {
                userMenu.classList.remove('open');
            });
        });
    }

    render() {
        return (
            <>
                <header className={`header`}>
                    <ul>
                        <li>
                            <a href="#">
                                <i className="fas fa-home" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fab fa-discord" />
                            </a>
                        </li>
                        <li data-dropdown>
                            <i className="fad fa-box-alt" />
                            <span className={'text'}>Features</span>
                            <ul>
                                <li>
                                    <a href="#">
                                        <span>Feature 1</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span>Feature 2</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span>Feature 3</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <div className={'user'}>
                        <div className={'image'}>
                            <img src={'https://github.com/jvopinho.png'} />
                            <div className={'menu'}>
                                <ul>
                                    <li>
                                        <a href="#">
                                            <span>Profile</span>
                                        </a>
                                    </li>
                                    
                                    <hr />

                                    <li>
                                        <a href="#">
                                            <span>Commands</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span>Settings</span>
                                        </a>
                                    </li>

                                    <hr />

                                    <li className={'logout'}>
                                        <a href="#">
                                            <span>Logout</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </header>
            </>
        );
    }
}