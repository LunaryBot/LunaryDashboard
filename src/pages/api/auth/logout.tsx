import { setCookie } from 'nookies';
import { NextApiResponse, NextApiRequest } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    setCookie({ res }, 'lunarydash.token', '', {
        maxAge: Date.now(),
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        path: '/',
    });

    res.redirect('/');
}