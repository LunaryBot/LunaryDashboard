import { GetServerSideProps } from 'next';
import Utils from '../utils/Utils';

export default function Link() {
    return <h1>Hello</h1>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const url = Utils.generateOAuth2({
        clientId: process.env.CLIENT_ID,
        redirectUri: process.env.OAUTH_REDIRECT_URI,
        scopes: ['identify', 'guilds', 'bot', 'applications.commands'],
        permissions: 8,
        guildId: context.query.guild as string | undefined,
        responseType: 'code',
    });

    return {
        redirect: {
            destination: url,
            permanent: false,
        }
    };
}