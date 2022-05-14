import React from 'react';
import SideBar from '../../../components/SideBar';
import NavBar from '../../../components/NavBar';
import { IUser } from '../../../@types';
import SelectMenu from '../../../components/SelectMenu';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import APIUtils from '../../../utils/APIUtils';
import Script from 'next/script';

class DashboardMe extends React.Component {
    public state: {
        user: IUser;
        redirect: boolean;
    }
    
    public navBar: NavBar;
    public sideBar: SideBar;

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
        this.api.user()
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

    render() {
        return (
            <div>
                <SideBar {...{urlsType: 'USER'}} ref={(sideBar) => this.sideBar = sideBar} />
                <div className="content">
                    <NavBar ref={(navBar) => { this.navBar = navBar; }} />
                    <this.selectMenu.Component {...{manager: this.selectMenu}} />
                </div>
            </div>
        );
    }
}

export default DashboardMe;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { ['__SessionLuny']: token } = parseCookies(context); 

    if(!token) return { 
        redirect: {
            destination: `/auth/login?state=${encodeURIComponent(context.req.url)}`,
            permanent: false,
        } 
    };

    return {
        props: {
            token,
            apiUrl: process.env.API_URL,
        },
    };
}