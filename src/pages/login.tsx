import { GetServerSideProps } from 'next'
import { Utils } from '../utils'

export default function Login() {
    return (
        <h1>Oh...</h1>
    )
}

export const getServerSideProps: GetServerSideProps = async() => {
    return {
        redirect: {
            destination: Utils.generateOAuth2Discord({
                clientId: process.env.DISCORD_CLIENT_ID,
                scopes: ['identify', 'guilds'],
                redirectUri: process.env.OAUTH2_DISCORD_REDIRECT_URI,
            }),
            permanent: false,
        },
    }
}