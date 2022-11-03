import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { ApiUrl as uri } from '../config/config';
import { createAPIClient } from './ApiService';

export class Client {
    public api: ApolloClient<NormalizedCacheObject>;
    public token: string;

    constructor(token?: string) {
        this.api = createAPIClient(token);

        this.token = token;
    }

    setToken(token: string) {
        delete this.api;

        this.token = token;
        this.api = createAPIClient(token);
    }
}