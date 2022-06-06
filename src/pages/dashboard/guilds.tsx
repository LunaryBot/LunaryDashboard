import React from 'react';
import SideBar from '../../components/SideBar';
import NavBar from '../../components/NavBar';
import { IUser } from '../../@types';
import APIUtils from '../../utils/APIUtils';
import getServerSideProps from '../../utils/getServerSideProps';
import GuildCard from '../../components/GuildCard';

class DashboardGuilds extends React.Component {
    public state: {
        user: IUser;
        redirect: boolean;
    }
    
    public navBar: NavBar;
    public sideBar: SideBar;

    private api: APIUtils;

    constructor(props) {
        super(props);

        this.api = new APIUtils(props.token, props.apiUrl);

        this.state = {
            user: undefined,
            redirect: false,
        };
    }

    get user() {
        return this.state.user;
    }

    componentDidMount() {
        this.connectApi();
    }

    connectApi() {
        this.api.connect()
        .then((user) => {
            console.log(user);
            this.setState({ user });
            
            this.navBar.setState({ user });
            this.sideBar.setState({ user });
        })
        .catch((err) => {
            window.location.href = `/auth/login?destroyToken=true?state=${window.location.href}`
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.guildId) {
            this.setState({ guild: undefined });
            
            this.navBar.setState({ guild: undefined });
            this.sideBar.setState({ guild: undefined });
        }
    }

    render() {
        return (
            <div>
                <SideBar {...{api: this.api}} ref={(sideBar) => this.sideBar = sideBar} />
                <div className="content">
                    <NavBar ref={(navBar) => { this.navBar = navBar; }} />
                    <main>
                        <h1>
                            {this.user?.username}
                        </h1>
                        <GuildCard />
                    </main>
                </div>
            </div>
        );
    }
}

export default DashboardGuilds;

export { getServerSideProps };