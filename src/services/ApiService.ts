import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApiUrl } from '../config/config';

export const api = new ApolloClient({
    uri: ApiUrl,
    cache: new InMemoryCache(),
});

export const createAPIClient = (token: string | null) => new ApolloClient({
    uri: ApiUrl,
    cache: new InMemoryCache(),
    headers: token ? { 'Authorization': token } : undefined,
});