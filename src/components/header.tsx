import { useEffect } from 'react';
import Link from 'next/link';

import styles from '../styles/Header.module.scss';

export function Header() {
    useEffect(() => {
        const dropdowns = document.querySelectorAll('[data-dropdown]');

        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener('click', (e) => {
                const classList = dropdown.classList;

                if(classList.toString().includes(styles.open)) {
                    classList.remove(styles.open)
                } else {
                    classList.add(styles.open)
                }
            });

            document.addEventListener('click', () => {
                dropdown.classList.remove(styles.open);
            });
        });
    }, []);

    return (
        <header className={styles.header}>
            <ul>
                <li>
                    <a href={'#'}>
                        <i className={'fas fa-home'} />
                    </a>
                </li>

                <li className={styles.sidebar}>
                    <a href={'#'}>
                        <i className={'fas fa-bars'} />
                    </a>
                </li>

                <li>
                    <a href={'#'}>
                        <i className={'fab fa-discord'} />
                    </a>
                </li>

                <li data-dropdown className=''>
                    <i className={'fad fa-box-alt'} />
                    <span className={styles.text}>Features</span>
                    <ul>
                        <li>
                            <a href={'#'}>
                                <span>Feature 1</span>
                            </a>
                        </li>

                        <li>
                            <a href={'#'}>
                                <span>Feature 2</span>
                            </a>
                        </li>

                        <li>
                            <a href={'#'}>
                                <span>Feature 3</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </header>
    )
}