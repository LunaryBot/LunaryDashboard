import { AbstractGuild, User } from '../@types';

type TScope = 
	'applications.builds.read' 
	| 'applications.commands'
	| 'applications.entitlements' 
	| 'applications.store.update' 
	| 'bot' 
	| 'connections' 
	| 'email' 
	| 'identify' 
	| 'guilds' 
	| 'guilds.join' 
	| 'gdm.join' 
	| 'webhook.incoming'

interface DiscordOAuth2 {
    clientId: string;
    scopes: TScope[];
    permissions?: bigint | number;
    guildId?: string;
    redirectUri?: string;
    state?: string;
    responseType?: string;
    prompt?: string;
    disableGuildSelect?: boolean;
}

export class Utils {
    static uuid(): string {
        let d = Date.now();
        let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16;
            if(d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    
    static stringAcronym(string: string): string {
        return string
            .replace(/'s /g, ' ')
            .replace(/\w+/g, w => w[0])
            .replace(/\s/g, '');
    }

    static getUserAvatar(user: User, options: { size: 128 | 256 | 512 | 1024 | 2048, dynamic?: boolean } = { size: 1024 }): string {
        if (user?.avatar) {
            return `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.webp?size=${options.size}`;
        } else {
            return `https://cdn.discordapp.com/embed/avatars/${Number(user?.discriminator || '0000') % 5}.png`;
        }
    }

    static getGuildIcon(guild: AbstractGuild, options: { size: 128 | 256 | 512 | 1024 | 2048, dynamic?: boolean } = { size: 1024 }): string {
        if (guild.icon) {
            return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${options.dynamic && guild.icon.startsWith('a_') && guild.features.includes('ANIMATED_ICON') ? 'gif' : 'png'}?size=${options.size}`;
        } else {
            return undefined;
        }
    }

    static generateOAuth2Discord({
        clientId = process.env.DISCORD_CLIENT_ID,
        scopes,
        permissions = BigInt(0),
        guildId = null,
        redirectUri = '/',
        responseType = 'code',
        state = null,
        disableGuildSelect = false,  
        prompt = null
    }: DiscordOAuth2) {
        const query = new URLSearchParams({
            client_id: clientId,
            scope: scopes.join(' '),
        });
    
        if (permissions) {
            query.set('permissions', Number(permissions).toString());
        };
    
        if (guildId) {
            query.set('guild_id', guildId);
            if(disableGuildSelect) {
                query.set('disable_guild_select', 'true');
            }
        };
    
        if(redirectUri) {
            query.set('redirect_uri', redirectUri);
            query.set('response_type', responseType);
            if(state) {
                query.set('state', state);
            };
            if(prompt) {
                query.set('prompt', prompt);
            };
        };
    
        return `https://discord.com/api/oauth2/authorize?${query.toString()}`;
    }
}