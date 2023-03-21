import React, { createContext, useEffect, useState } from 'react';

import { User, UserWithGuilds, AbstractGuild, Guild } from '../@types';
import { createAPIClient } from '../services/ApiService';
import { ApolloError, gql, NetworkStatus, ServerError, ServerParseError } from '@apollo/client';
import { Client } from '../services/ClientService';
import { NetworkError } from '@apollo/client/errors';
import { Utils } from '../utils';

const guildUrlString = /\/dashboard\/guilds\/(\d*)(\/.*)?/i

interface APIContextData {
    signed: boolean;
    loading: boolean;
    user: UserWithGuilds;
    guild?: Guild;

    // checkGuild: (guildId: string) => boolean;
    // fetchGuild: (id: string) => Promise<Guild[]>;
    // fetchUserGuilds: () => Promise<AbstractGuild[]>;
}

const APIContext = createContext<APIContextData>({} as APIContextData);

export class APIProvider extends React.Component<React.PropsWithChildren, {
    loading: boolean;
    user: UserWithGuilds;
    token: string;
    guild: Guild;
}> {

    constructor(props: React.PropsWithChildren) {
        super(props);

        this.state = {
            loading: true,
            user: null, 
            guild: null,
            token: null,
        }
    }

    render(): React.ReactNode {
        const { 
            props: { children },
            state: { loading, user, guild },
        } = this;

        return (
            <APIContext.Provider value={{
                signed: !!user, 
                loading, 
                user, 
                guild,
            }}>
                {children}
            </APIContext.Provider>
        )
    }
}

export default APIContext;