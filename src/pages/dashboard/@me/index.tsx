import React from 'react';
import SideBar from '../../../components/SideBar';
import NavBar from '../../../components/NavBar';
import { IUser } from '../../../@types';
import SelectMenu from '../../../components/SelectMenu';

class DashboardMe extends React.Component {
    public state: {
        user: IUser;
    }

    public selectMenu = new SelectMenu([
        {
            value: '1',
            label: 'Option 1',
            default: true,
        },
        {
            value: '2',
            label: 'Option 2',
        },
        {
            value: '3',
            label: 'Option 3',
        }
    ], {
        placeholder: 'Select an option',
        max_values: 2,
    });

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
                    <this.selectMenu.Component {...{manager: this.selectMenu}} />
                </div>
            </div>
        );
    }
}

export default DashboardMe;