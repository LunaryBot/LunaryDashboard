export enum URLS {
	BASE = 'https://discord.com/api/oauth2/authorize',
	TOKEN = 'https://discord.com/api/oauth2/token',
	REVOKE = 'https://discord.com/api/oauth2/token/revoke',
	USER = 'https://discord.com/api/users/@me',
	GUILDS = 'https://discord.com/api/users/@me/guilds',
}

export interface User {
	avatar: string;
	discriminator: string;
	email: string;
	flags: number;
	id: string;
	locale: string;
	mfa_enabled: boolean;
	public_flags: number;
	username: string;
	verified: boolean;
}

export interface GuildData {
	icon: string;
	id: string;
	name: string;
	owner: boolean;
	permissions: number;
	features: string[];
	permissions_new: string;
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

export interface Channel {
	id: string;
	name: string;
	type: string;
	deleted: boolean;
	guildId: string;
	guild: string;
	parentId: string;
	permissionOverwrites: string[];
	nsfw: boolean;
	position: number;
	rawPosition: number;
	topic: string|null;
	lastMessageId: string|null;
	rateLimitPerUser: number;
	createdTimestamp: number;
}

export interface Role {
	id: string;
	name: string;
	color: number;
	hoist: boolean;
	position: number;
	permissions: number;
	managed: boolean;
	mentionable: boolean;
	createdTimestamp: number;
	deleted: boolean;
	icon: string|null;
	rawPosition: number;
	unicodeEmoji: boolean;
	guild: string;
}

export interface Guild {
	name: string;
	id: string;
	icon: string;
	channels: Channel[];
	roles: Role[];
	shardID: number;
	cluserID: string;
}