import { GetServerSideProps } from 'next';

export default function Login() {
    return (
        <a href={"/api/auth/login"}>Click me!</a>
    )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
    return {
        redirect: {
            destination: '/api/auth/login',
            permanent: false
        }
    }
}