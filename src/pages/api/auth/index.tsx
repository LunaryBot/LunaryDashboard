import { NextApiResponse, NextApiRequest } from 'next';
import { scopes, URLS, TokenData } from '../../../types';
import nookies from 'nookies';
import { encode } from '../../../Utils/encode';
import axios from 'axios';
require('dotenv').config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const code = req.query.code as string;
    console.log(code)

    const data = {
		client_id: process.env.DISCORD_CLIENT_ID,
		client_secret: process.env.DISCORD_CLIENT_SECRET,
		grant_type: 'authorization_code',
		redirect_uri: 'http://localhost:3000/api/auth/callback',
		code,
		scope: 'identify guilds',
	};

    if(!code) res.send('No code');

    const token: any = await axios.post(URLS.TOKEN, {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: encode(data),
	});

    if(!token.access_token) res.send('No access token');

    nookies.set({ res }, 'lunarydash.token', token.access_token, {
		maxAge: 1 * 60 * 60, // 1 hour
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		path: '/',
	});

    nookies.set({ res }, 'lunarydash.token_type', token.token_type, {
		expires: new Date(Date.now() + token.expires_in * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		path: '/',
	});

    console.log(token);
    res.redirect('/');
}