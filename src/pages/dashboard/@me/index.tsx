import React from 'react';
import SideBar from '../../../components/SideBar';
import NavBar from '../../../components/NavBar';
import { IUser } from '../../../@types';

class DashboardMe extends React.Component {
    public state: {
        user: IUser;
    }

    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: '452618703792766987',
                avatar: '4e7b6fef7f598ab363f5be84ffe6c3b1',
                discriminator: '7500',
                username: 'Bae.',
                public_flags: 64,
            }
        };
    }

    get user() {
        return this.state.user;
    }

    render() {
        return (
            <div>
                <SideBar {...{urlsType: 'USER', user: this.user}} />
                <div className="content">
                    <NavBar {...{user: this.user}}/>
                    {/* <h1 style={{color: 'var(--luny-colors-text-100)'}}>Dashboard Sidebar</h1> */}
                </div>
            </div>
        );
    }
}

export default DashboardMe;