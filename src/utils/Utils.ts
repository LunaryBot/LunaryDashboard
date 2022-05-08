import { IGuild, IGuildData, IUser } from '../@types';

class Utils {
    static getUserAvatar(user: IUser, options: { size: 128 | 256 | 512 | 1024 | 2048, dynamic?: boolean } = { size: 1024 }): string {
        if (user.avatar) {
            return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${options.dynamic && user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=${options.size}`;
        } else {
            return `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator) % 5}.png`;
        }
    }

    static getGuildIcon(guild: IGuildData|IGuild, options: { size: 128 | 256 | 512 | 1024 | 2048, dynamic?: boolean } = { size: 1024 }): string {
        if (guild.icon) {
            return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${options.dynamic && guild.icon.startsWith('a_') && guild.features.includes('ANIMATED_ICON') ? 'gif' : 'png'}?size=${options.size}`;
        } else {
            return undefined;
        }
    }

    static stringAcronym(string: string): string {
        return string
            .replace(/'s /g, ' ')
            .replace(/\w+/g, w => w[0])
            .replace(/\s/g, '');
    }
}

export default Utils;