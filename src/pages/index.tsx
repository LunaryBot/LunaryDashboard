import { gql } from 'graphql-request';

import useFetch from '../utils/useFetch';

const query = gql`
    query Punishments($type: Float) {
        Punishments(type: $type) {
            id
        }
    }
`

export default function Index() {
    const { data: { Punishments } = {} } = useFetch<{ Punishments: Array<{ id: string }> }>({
        query,
        variables: {
            type: 1,
        },
    });

    return (
        <>
            <h1>Hello World</h1>
            {Punishments?.map(punsihemt => (<p key={punsihemt.id}>{punsihemt.id}</p>))}
        </>
    )
}