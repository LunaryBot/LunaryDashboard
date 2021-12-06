import { NextApiResponse, NextApiRequest } from 'next';
import { scopes } from '../../../types';
import nookies from 'nookies';
import fetch from 'node-fetch'
import formData from 'form-data'
require('dotenv').config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const code = req.query.code as string;

    if(!code) {
      if(req.query.error) {
        const error = req.query.error as string;
        // const errorDescription = req.query.error_description as string;
        if(error === 'access_denied') return res.redirect('/');
      }
      return res.send('No code');
    }

    const data = new formData();
    data.append("client_id", process.env.DISCORD_CLIENT_ID)
    data.append("client_secret", process.env.DISCORD_CLIENT_SECRET)
    data.append("grant_type", "authorization_code")
    data.append("redirect_uri", "http://localhost:3000/api/auth/callback")
    data.append("scopes", scopes.join(" "))
    data.append("code", code)

    const token: any = await fetch("https://discordapp.com/api/oauth2/token", {
      method: 'POST',
      body: data
    }).then(x => x.json())

    if(!token.access_token) return res.send('No access token');

    nookies.set({ res }, 'lunarydash.token', token.access_token, {
      maxAge: 5 * 60 * 60, // 5 hours
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      path: '/',
    });

    const state = req.query.state as string;
    if(state) {
      const url = global.states?.[state];
      if(url) {
        delete global.states[state];
        return res.redirect(url);
      }
      if(url) return res.redirect(url);
    }

    res.redirect('/dashboard/@me');
}