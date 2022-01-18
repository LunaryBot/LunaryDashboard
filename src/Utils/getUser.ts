const fetchTokens = process.env.DISCORD_TOKENS.split(',');
import axios from 'axios';
import { DiscordUser } from '../types';

const UnknownUser = {
    id: "0".repeat(18),
    username: "Unknown",
    discriminator: "0000",
    avatar: null
}

export default async function getUser(userId): Promise<DiscordUser>  {
    if(!global.users || !(global.users instanceof Map)) global.users = new Map();
    
    let user: DiscordUser = global.users.get(userId);

    if(!user) {
        try {
            user = (await axios.get(`https://discord.com/api/v9/users/${userId}`, { 
                headers: {
                    Authorization: `Bot ${fetchTokens[Math.floor(Math.random() * fetchTokens.length)]}` 
                } 
            })).data
        } catch(_) {
            user = UnknownUser;
        }

        global.users.set(userId, user);
    }

    return user
}