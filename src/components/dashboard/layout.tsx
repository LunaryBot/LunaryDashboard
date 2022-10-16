import React from 'react';

import { DashboardSidebar } from './sidebar';
import { Header } from '../header';

import styles from '../../styles/Sidebar.module.scss';

export class DashboardLayout extends React.Component {
    props: React.PropsWithChildren;

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log('a')
    }

    render() {
        const { children } = this.props;

        return (
            <>
                <DashboardSidebar />
                <section className={styles.content}>
                    <Header />
                    {children}
                </section>
            </>
        )
    }
}