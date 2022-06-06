import React from 'react';

import SideBar from '../../../../components/SideBar';
import NavBar from '../../../../components/NavBar';

import { IUser, IGuild } from '../../../../@types';
import APIUtils from '../../../../utils/APIUtils';
import getServerSideProps from '../../../../utils/getServerSideProps';

class DashboardMe extends React.Component {
    public props: {
        token: string;
        apiUrl: string;
        guildId?: string;
    }

    public state: {
        user: IUser;
        guild: IGuild;
        redirect: boolean;
    }
    
    public navBar: NavBar;
    public sideBar: SideBar;

    private api: APIUtils;

    constructor(props) {
        super(props);

        this.api = new APIUtils(props.token, props.apiUrl, props.guildId);

        this.state = {
            user: undefined,
            guild: undefined,
            redirect: false,
        };
    }

    get user() {
        return this.state.user;
    }

    connectApi() {
        this.api.connect()
        .then((data) => {
            this.setState({ ...data });
            
            this.navBar.setState({ user: data.user });
            this.sideBar.setState({ user: data.user, guild: data.guild });
        })
        .catch((err) => {
            window.location.href = `/auth/login?destroyToken=true?state=${window.location.href}`
        });
    }

    componentDidMount() {
        this.connectApi();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.guildId !== this.props.guildId) {
            this.api.guildId = (this.props as { guildId: string }).guildId;
            
            this.connectApi();
        }
    }

    render() {
        return (
            <div>
                <SideBar {...{urlsType: 'GUILD', api: this.api}} ref={(sideBar) => this.sideBar = sideBar} />
                <div className="content">
                    <NavBar ref={(navBar) => { this.navBar = navBar; }} />
                    <main>
                        <h1>
                            {this.state.guild?.name}
                        </h1>
                    </main>
                </div>
            </div>
        );
    }
}

export default DashboardMe;

export { getServerSideProps };