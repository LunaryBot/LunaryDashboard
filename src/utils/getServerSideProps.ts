import { parseCookies } from 'nookies';

export default async (context) => {
    const { ['__SessionLuny']: token } = parseCookies(context); 

    if(!token) return { 
        redirect: {
            destination: `/auth/login?state=${encodeURIComponent(context.req.url)}`,
            permanent: false,
        } 
    };

    return {
        props: {
            token,
            apiUrl: process.env.API_URL,
            guildId: context.query.guild,
        },
    };
}