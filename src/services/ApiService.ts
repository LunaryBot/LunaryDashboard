import { GraphQLClient } from 'graphql-request';
import { ApiUrl } from '../config/config';

export const client = new GraphQLClient(ApiUrl);