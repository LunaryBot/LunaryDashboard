import styles from '../../styles/Sidebar.module.scss';

export function DashboardSidebar(props: {}) {
    return (
        <div className={styles.sidebar}>
            <ul className={styles.links}>
                <li>
                    <a href="#">
                        <span>Dashboard</span>
                    </a>
                </li>
            </ul>

            <div className={styles.profile}>
                <div className={styles.image}>
                    <img src={'https://github.com/jvopinho.png'} alt={'@jvopinho'} />
                </div>

                <p>JVOPINHOOOOOOOOOOOO</p>
                <span>#7500</span>
            </div>
        </div>
    )
}