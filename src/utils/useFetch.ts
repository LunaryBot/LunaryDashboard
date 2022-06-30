import useSWR from 'swr';
import { OperationVariables, gql, DocumentNode, TypedDocumentNode } from '@apollo/client';

import { client } from '../services/ApiService'

interface useFetchData {
    query: DocumentNode | TypedDocumentNode<any, OperationVariables>;
    variables?: OperationVariables;
}

function useFetch<TypeData = any, TypeError = any>(query: string|useFetchData) {
    const { data, error, isValidating, mutate } = useSWR<TypeData, TypeError>(query, async(queryData: string|useFetchData) => {
        const _data = {} as useFetchData;

        if(typeof queryData == 'string') {
           _data.query = gql(queryData)
        } else {
            _data.query = (queryData as useFetchData).query;
            _data.variables = (queryData as useFetchData).variables;
        }

        const result = await client.query({ query: _data.query, variables: _data.variables || {} }) as any;

        console.log(result);

        return result?.data;
    });

    return { data, error, isValidating, mutate };
}

export default useFetch;