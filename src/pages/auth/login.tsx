import { GetServerSideProps } from 'next';
import Utils from '../../utils/Utils';
import { setCookie } from 'nookies';

export default function AuthLogin() {
    return <h1>Hello</h1>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if(context.query.destroyToken === 'true') {
        setCookie(context, '__SessionLuny', '', {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            path: '/',
        });
    };

    const url = Utils.generateOAuth2({
        clientId: process.env.CLIENT_ID,
        redirectUri: process.env.OAUTH_REDIRECT_URI,
        scopes: ['identify', 'guilds'],
        prompt: 'none',
        responseType: 'code',
        state: Buffer.from(context.query.state as string | undefined || '').toString('base64url'),
    });

    return {
        redirect: {
            destination: url,
            permanent: false,
        }
    };
}