const fetchTokens = process.env.DISCORD_TOKENS.split(',');
import axios from 'axios';
import { DiscordUser } from '../types';

const UnknownUser = {
    id: "0".repeat(18),
    username: "Unknown",
    discriminator: "0000",
    avatar: "https://media.discordapp.net/attachments/880176654801059860/915300231866900530/91ce69b6c7c6ab40b1d35808979394a5.png?width=499&height=499"
}

export default async function getUser(userId): Promise<DiscordUser>  {
    let user: DiscordUser;

    if(!global.users || !(global.users instanceof Map)) global.users = new Map();

    if(global.users.has(userId)) {
        user = global.users.get(userId);
    } else {
        try {
            user = (await axios.get(`https://discord.com/api/v9/users/${userId}`, { 
                headers: {
                    Authorization: `Bot ${fetchTokens[Math.floor(Math.random() * fetchTokens.length)]}` 
                } 
            })).data
        } catch(_) {
            user = UnknownUser;
        }
    }

    return user
}