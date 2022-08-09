import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApiUrl } from '../config/config';

export const client = new ApolloClient({
    uri: ApiUrl,
    cache: new InMemoryCache(),
});