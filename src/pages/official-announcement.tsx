import { GetServerSideProps } from 'next';
import generateOAuth2 from "../utils/generateOAuth2";
import Permissions from '../utils/Permissions';

export default function Login() {
    return (
        <h1>Oxe</h1>
    )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
    const url = "https://youtu.be/oavMtUWDBTM";

    return {
        redirect: {
            destination: url,
            permanent: false
        }
    }
}
