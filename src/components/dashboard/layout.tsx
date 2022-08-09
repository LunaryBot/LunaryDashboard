import React from 'react';

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
                <main>{children}</main>
            </div>
        )
    }
}