export enum URLS {
	BASE = 'https://discord.com/api/oauth2/authorize',
	TOKEN = 'https://discord.com/api/oauth2/token',
	REVOKE = 'https://discord.com/api/oauth2/token/revoke',
	USER = 'https://discord.com/api/users/@me',
	GUILDS = 'https://discord.com/api/users/@me/guilds',
}

export const scopes: Array<string> = [
	'identify',
	'guilds'
];

export interface TokenData {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
}