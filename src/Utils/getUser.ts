const fetchTokens = process.env.DISCORD_TOKENS.split(',');
import axios from 'axios';
import { DiscordUser } from '../types';

export default async function getUser(userId): Promise<DiscordUser>  {
    const user: DiscordUser = (await axios.get(`https://discord.com/api/v9/users/${userId}`, { 
        headers: {
            Authorization: `Bot ${fetchTokens[Math.floor(Math.random() * fetchTokens.length)]}` 
        } 
    })).data

    return user
}