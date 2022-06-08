import React from 'react';
import SideBar from '../../../components/SideBar';
import NavBar from '../../../components/NavBar';
import { IGuildData, IUser } from '../../../@types';
import APIUtils from '../../../utils/APIUtils';
import getServerSideProps from '../../../utils/getServerSideProps';
import GuildCard from '../../../components/GuildCard';

class DashboardGuilds extends React.Component {
    public state: {
        user: IUser;
        guilds: IGuildData[];
        guildsCard: GuildCard[];
        redirect: boolean;
        favoriteGuilds: string[];
    }
    
    public navBar: NavBar;
    public sideBar: SideBar;

    private api: APIUtils;

    constructor(props) {
        super(props);

        this.api = new APIUtils(props.token, props.apiUrl);

        this.state = {
            user: undefined,
            guilds: undefined,
            guildsCard: [],
            redirect: false,
            favoriteGuilds: [],
        };
    }

    get user() {
        return this.state.user;
    }

    async componentDidMount() {
        await this.connectApi();

        const favoriteGuilds = (localStorage.getItem('favoriteGuilds') || '').split(',').filter(Boolean);

        this.setState({ favoriteGuilds });

        if(!this.sideBar?.state.guilds) {
            const guilds = await this.api.guilds();

            this.sideBar.setState({ guilds });
            this.setState({ guilds: guilds.filter(guild => (guild.permissions & 8) == 8) });
        } else {
            this.setState({ guilds: this.sideBar.state.guilds });
        }

        window.toggleFavorite = (guildId) => {
            const { favoriteGuilds } = this.state;

            if(favoriteGuilds.includes(guildId)) {
                favoriteGuilds.splice(favoriteGuilds.indexOf(guildId), 1);
            } else {
                favoriteGuilds.push(guildId);
            }

            localStorage.setItem('favoriteGuilds', favoriteGuilds.filter(Boolean).join(','));

            this.state.guildsCard.filter(guild => guild?.state.id === guildId).forEach(guild => guild.setState({ favorite: !guild.state.favorite }));

            this.setState({ favoriteGuilds });
        }
    }

    connectApi() {
        return this.api.connect()
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

    guilds() {
        const { favoriteGuilds: favoriteGuildsIds } = this.state;

        const favoriteGuilds = this.state.guilds?.filter(guild => favoriteGuildsIds.includes(guild.id)).map(guild => ({
            ...guild,
            favorite: true,
        })) || [];

        const sort = (a: IGuildData, b: IGuildData) => a.name.localeCompare(b.name);

        return (
            <>
                {favoriteGuilds.length > 0 && (
                    <>
                        <br />
                        <br />
                        <h1 style={{
                            fontSize: '1.5rem',
                        }}>Favorites</h1>
                        <br />
                        <br />

                        {favoriteGuilds
                        .sort(sort)
                        .map(guild => (
                            <GuildCard key={guild.id} {...guild} />
                        ))}

                        <h1/>
                    </>
                )}

                <br />

                {this.state.guilds?.filter(guild => guild.access).sort(sort)
                .map(guild => (
                    <GuildCard key={guild.id} {...{...guild, favorite: favoriteGuildsIds.includes(guild.id)}} ref={(guild) => this.state.guildsCard.push(guild)} />
                ))}

                {this.state.guilds?.filter(guild => !guild.access).sort(sort)
                .map(guild => (
                    <GuildCard key={guild.id} {...{...guild, favorite: favoriteGuildsIds.includes(guild.id)}} ref={(guild) => this.state.guildsCard.push(guild)} />
                ))}
            </>
        );
    }

    render() {
        return (
            <div>
                <SideBar {...{api: this.api}} ref={(sideBar) => this.sideBar = sideBar} />
                <div className="content">
                    <NavBar ref={(navBar) => { this.navBar = navBar; }} />
                    <main>
                        <h1>
                            <i className='far fa-grip-vertical' /> Servidores
                        </h1>
                        {this.guilds()}
                    </main>
                </div>
            </div>
        );
    }
}

export default DashboardGuilds;

export { getServerSideProps };