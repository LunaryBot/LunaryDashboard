import { GetServerSideProps } from 'next';
import Utils from '../../utils/Utils';
import { setCookie } from 'nookies';

export default function AuthCallback() {
    return <h1>Hello</h1>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    setCookie(context, '__SessionLuny', context.query.token as string, {
        maxAge: 6 * 60 * 60, // 6 hours
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        path: '/',
    });

    return {
        redirect: {
            destination: Buffer.from(context.query.state as string | undefined || '', 'base64url').toString() || '/dashboard/@me',
            permanent: false,
        }
    };
}