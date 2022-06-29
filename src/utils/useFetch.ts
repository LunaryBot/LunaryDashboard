import useSWR from 'swr';
import { OperationVariables } from '@apollo/client';
import { gql } from 'graphql-request';

import { client } from '../services/ApiService'

interface useFetchData {
    query: string;
    variables?: OperationVariables;
}

function useFetch<TypeData = any, TypeError = any>(query: string|useFetchData) {
    const { data, error, isValidating, mutate } = useSWR<TypeData, TypeError>(query, async(queryData: string|useFetchData) => {
        const _data = {} as useFetchData;

        if(typeof queryData != 'string') {
            _data.query = (queryData as useFetchData).query;
            _data.variables = (queryData as useFetchData).variables;
        } else {
            _data.query = queryData;
        }

        const result = await client.request(_data.query, { variables: _data.variables || {} }) as any;

        return result;
    });

    return { data, error, isValidating, mutate };
}

export default useFetch;