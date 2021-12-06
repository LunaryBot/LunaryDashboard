import { GetServerSideProps } from 'next';

export default function Login() {
    return (
        <a href={"/api/auth/login"}>Click me!</a>
    )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
    const state = ctx.query.state;

    return {
        redirect: {
            destination: `/api/auth/login${state ? `?state=${state}` : ''}`,
            permanent: false
        }
    }
}