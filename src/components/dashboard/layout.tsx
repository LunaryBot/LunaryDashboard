import React from 'react';

import { DashboardSidebar } from './sidebar';

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
                <div className={styles.content}>
                    {children}
                </div>
            </>
        )
    }
}