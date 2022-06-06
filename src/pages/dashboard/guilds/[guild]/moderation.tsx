import React from 'react';

import SideBar from '../../../../components/SideBar';
import NavBar from '../../../../components/NavBar';
import Toggle from '../../../../components/Toggle';
import SelectMenu from '../../../../components/SelectMenu';

import { IGuild, IUser } from '../../../../@types';
import Utils from '../../../../utils/Utils';
import APIUtils from '../../../../utils/APIUtils';
import { ChannelTypes } from '../../../../utils/Constants';
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
        form: Array<SelectMenu|Toggle>;
    }
    
    public navBar: NavBar;
    public sideBar: SideBar;

    private api: APIUtils;

    constructor(props) {
        super(props);

        this.api = new APIUtils(props.token, props.apiUrl, props.guildId);

        this.state = {
            user: null,
            guild: null,
            redirect: false,
            form: [],
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

            this.state.form?.forEach((comp) => {
                console.log(comp);

                comp?.setState({
                    options: Utils.sortChannels(data.guild.channels)
                        .filter((channel) => [ChannelTypes.GUILD_TEXT, ChannelTypes.GUILD_NEWS].includes(channel.type))
                        .map((channel) => ({
                            label: channel.name,
                            value: channel.id,
                        })) || [],
                })
            })
        })
        .catch((err) => {
            console.log(err);
            // window.location.href = `/auth/login?destroyToken=true?state=${window.location.href}`
        });
    }

    componentDidMount() {
        this.connectApi();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.guildId !== this.props.guildId) {
            this.api.guildId = (this.props as { guildId: string }).guildId;

            this.connectApi();
        }
    }

    render() {
        return (
            <div>
                <SideBar {...{urlsType: 'GUILD', api: this.api }} ref={(sideBar) => this.sideBar = sideBar} />
                <div className="content">
                    <NavBar ref={(navBar) => { this.navBar = navBar; }} />
                    <main>
                        <h1>
                            <i className={'far fa-hammer'} /> Moderation
                        </h1>

                        <div className={'small-card'}>
                            <h2>Canal de Punicões</h2>
                            <SelectMenu {...{
                                options: [],
                                max_values: 1, 
                                placeholder: 'Select a channel' 
                            }} ref={(select) => this.state.form.push(select)} />

                            <br />
                            
                            <details>
                                <summary>
                                    <span>
                                        <i className={'fas fa-pen'} style={{color: 'var(--luny-colors-blue)'}} />
                                    </span>
                                </summary>
                                <p style={{borderColor: 'var(--luny-colors-blue)', color: 'var(--luny-colors-blue)'}}>
                                    <i className={'fas fa-pen'} style={{color: 'var(--luny-colors-blue)'}} /> Você sabia que é possivel customizar a mensagem de punição? Para isso, <a href={`/dashboard/guilds/${this.state.guild?.id}/punishment-embed`}>clique aqui</a>.
                                </p>
                            </details>
                        </div>
                        <div className={'small-card'}>
                            <h2>a</h2>
                        </div>
                        
                        <div className={'card'}>
                            <h2>
                                <i className={'fas fa-user-plus'} /> Invite
                            </h2>

                            <label>Ban <Toggle ref={(toggle) => {
                                toggle?.addEventListener('change', (value) => {
                                    console.log(value);
                                });
                            }} /></label>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default DashboardMe;

export { getServerSideProps };