import Link from 'next/link';
import { useRouter } from 'next/router';

import Dots from '../Dots';

import styles from '../../styles/Sidebar.module.scss';
import { useEffect, useState } from 'react';

const servers = [
    'LunaryBot',
    'Ballerini-Server',
    'ZulyBot',
    'IsLuny',
    'mpyorg',
    'Blue-Phoenix-org',
    'TuneMusicBot',
];

export function DashboardSidebar(props: {}) {
    const [opened, setOpen] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => console.log(opened))

    const openedProps = opened ? {'data-opened': true} : {}

    return (
        <nav className={styles.sidebar}>
            <header>
                <div className={styles.container}>
                    <div className={styles.profile} {...openedProps} onClick={() => setOpen(!opened)}>
                        <span className={styles.image}>
                            <img src={'https://github.com/jvopinho.png'} alt={'@jvopinho'} />
                        </span>

                        <div className={styles.text}>
                            <span className={styles.name}>Bae.</span>
                            <span className={styles.id}>452618703792766987</span>
                        </div>
                    </div>

                    <section className={styles.serversMenuWrapper} {...openedProps}>
                        <div className={styles.serversMenu}>
                            <ul>
                                <li data-selected>
                                    <Link href={'/dashboard/@me'}>
                                        <a>
                                            <div className={styles.server}>
                                                <span className={styles.image}>
                                                    <img src={'https://github.com/jvopinho.png'} />
                                                </span>

                                                <span className={styles.text}>
                                                    <span className={styles.name}>Bae.</span>
                                                </span>
                                            </div>
                                        </a>
                                    </Link>  
                                </li>

                                <hr />

                                {servers.map(name => (
                                    <li>
                                        <Link href={`/dashboard/guilds/${name}`}>
                                            <a>
                                                <div className={styles.server}>
                                                    <span className={styles.image}>
                                                        <img src={`https://github.com/${name}.png`} />
                                                    </span>

                                                    <span className={styles.text}>
                                                        <span className={styles.name}>{name}</span>
                                                    </span>
                                                </div>
                                            </a>
                                        </Link>  
                                    </li>
                                ))}

                                <hr />

                                <li className={styles.invite}>
                                    <Link href={'/invite'}>
                                        <a>
                                            <div className={styles.server}>
                                                <span className={styles.image}>
                                                    <img src={'https://imgur.com/xCIgS2n.png'} style={{borderRadius: '0'}} />
                                                </span>

                                                <span className={styles.text}>
                                                    <span className={styles.name}>Invite</span>
                                                </span>
                                            </div>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            </header>

            <ul className={styles.links}>
                <div>
                    <li>
                        <span>General</span>
                    </li>
                    <li data-selected>
                        <Link href='#'>
                            <a>
                                <i className={`${router.asPath == '/' ? 'fa' : 'far'} fa-home`} />
                                <span>Dashboard</span>
                            </a>
                        </Link>
                    </li>
                </div>
            </ul>
        </nav>
    )
}