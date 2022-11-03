import { AbstractGuild } from "../@types";

export class Utils {
    static stringAcronym(string: string): string {
        return string
            .replace(/'s /g, ' ')
            .replace(/\w+/g, w => w[0])
            .replace(/\s/g, '');
    }

    static getGuildIcon(guild: AbstractGuild, options: { size: 128 | 256 | 512 | 1024 | 2048, dynamic?: boolean } = { size: 1024 }): string {
        if (guild.icon) {
            return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${options.dynamic && guild.icon.startsWith('a_') && guild.features.includes('ANIMATED_ICON') ? 'gif' : 'png'}?size=${options.size}`;
        } else {
            return undefined;
        }
    }
}