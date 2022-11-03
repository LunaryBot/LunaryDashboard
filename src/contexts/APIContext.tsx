import React, { createContext, useEffect, useState } from 'react';

import { User, UserWithGuilds, AbstractGuild } from '../@types';
import { createAPIClient } from '../services/ApiService';
import { gql } from '@apollo/client';
import { Client } from '../services/ClientService';

interface APIContextData {
    signed: boolean;
    loading: boolean;
    user: UserWithGuilds;

    fetchUserGuilds: () => Promise<AbstractGuild[]>;
}

const APIContext = createContext<APIContextData>({} as APIContextData);

export class APIProvider extends React.Component {
    public props: React.PropsWithChildren;
    public state: {
        loading: boolean;
        user: UserWithGuilds;
        token: string;
    }

    public client = new Client();

    constructor(props: React.PropsWithChildren) {
        super(props);

        this.state = {
            loading: true,
            user: null,
            token: null,
        }
    }

    componentDidMount(): void {
        const storagedToken = localStorage.getItem('auth_token');

        const loadUser = async() => {
            this.client.setToken(storagedToken);

            const { data, errors } = await this.client.api.query({
                query: gql`
                    query User {
                        CurrentUser {
                            username
                            id
                            public_flags
                            avatar
                            discriminator
                        }
                    }
                `,
            });
            
            if(errors?.length > 0) {
                return errors;
            }

            if(data) {
                this.setState({
                    user: { ...data.CurrentUser, guilds: null },
                    loading: false,
                    token: storagedToken,
                });
            }
        }

        if(storagedToken) {
            loadUser();
        }
    }

    async fetchUserGuilds() {
        const { data, errors } = await this.client.api.query({
            query: gql`
                query UserGuilds($filter_guilds: Boolean) {
                    CurrentUserGuilds(filter: $filter_guilds) {
                        id
                        name
                        features
                        icon
                        owner
                        permissions
                    }
                }
            `,
            variables: {
                filter_guilds: true,
            }
        });

        const guilds = data.CurrentUserGuilds;

        this.setState({
            user: { ...this.state.user, guilds },
        });

        return guilds as AbstractGuild[];
    }

    render(): React.ReactNode {
        const { 
            props: { children },
            state: { loading, user },
            fetchUserGuilds,
        } = this;

        return (
            <APIContext.Provider value={{signed: !!user, user, loading, fetchUserGuilds: fetchUserGuilds.bind(this)}}>
                {children}
            </APIContext.Provider>
        )
    }
}

export default APIContext;