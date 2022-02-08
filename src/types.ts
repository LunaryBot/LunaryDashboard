export enum URLS {
	BASE = 'https://discord.com/api/oauth2/authorize',
	TOKEN = 'https://discord.com/api/oauth2/token',
	REVOKE = 'https://discord.com/api/oauth2/token/revoke',
	USER = 'https://discord.com/api/users/@me',
	GUILDS = 'https://discord.com/api/users/@me/guilds',
}

export interface IUser {
	username: string;
	id: string;
	discriminator: string;
	avatar: string|null;
	public_flags: number;
	banner?: string;
	banner_color?: string;
	accent_color?: number;
	flags?: number;
	locale?: string;
	email?: string;
	mfa_enabled?: boolean;
	verified?: boolean;
}

export interface IGuildData {
	icon: string;
	id: string;
	name: string;
	owner: boolean;
	permissions: number;
	features: string[];
	permissions_new: string;
} 

export const scopes: string[] = [
	'applications.builds.read',
	'applications.commands',
	'applications.entitlements',
	'applications.store.update',
	'bot',
	'connections',
	'email',
	'identify',
	'guilds',
	'guilds.join',
	'gdm.join',
	'webhook.incoming'
];

export type Tscope = 
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

export interface ITokenData {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
}

export interface IChannel {
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

export interface IRole {
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

export interface IGuild {
	name: string;
	id: string;
	icon: string;
	channels: IChannel[];
	roles: IRole[];
	shardID: number;
	cluserID: string;
}

export interface IGuildSuper extends IGuild {
	modlogs_channel: string;
	punishments_channel: string;
	configs: number;
}

export interface IAPIGuildResponse {
	status: number;
	statusText: string;
	data?: IGuild|null;
	query: string;
}

export interface ILogData {
	id: string;
	type: number;
	reason: string;
	date: number;
	time?: number;
	user: string;
	author: string;
	server: string;
}

export interface ILog {
	id: string;
	type: number;
	reason: string;
	date: number;
	time?: number;
	server: string;
	user: IUser;
	author: IUser;
}