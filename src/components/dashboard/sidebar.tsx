import Link from 'next/link';
import { useRouter } from 'next/router';

import Dots from '../Dots';

import styles from '../../styles/Sidebar.module.scss';

export function DashboardSidebar(props: {}) {
    const router = useRouter();
    
    console.log(router);
    return (
        <nav className={styles.sidebar}>
            <header>
                <div className={styles.container}>
                    <div className={styles.profile}>
                        <span className={styles.image}>
                            <img src={'https://github.com/jvopinho.png'} alt={'@jvopinho'} />
                        </span>

                        <div className={styles.text}>
                            <span className={styles.name}>Bae.</span>
                            <span className={styles.id}>452618703792766987</span>
                        </div>
                    </div>
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