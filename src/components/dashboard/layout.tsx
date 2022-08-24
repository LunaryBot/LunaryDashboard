import React from 'react';

import { DashboardSidebar } from './sidebar';

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
            <div>
                <DashboardSidebar />
                <main>{children}</main>
            </div>
        )
    }
}