import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GraphQLClient } from 'graphql-request';
import { ApiUrl } from '../config/config';

export const client = new ApolloClient({
    uri: ApiUrl,
    cache: new InMemoryCache(),
});