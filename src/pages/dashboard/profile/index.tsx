import { GetServerSideProps } from 'next';

export default function Login() {
    return (
        <a href={"/dashboard/@me"}>Click me!</a>
    )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
    return {
        redirect: {
            destination: '/dashboard/@me',
            permanent: false
        }
    }
}