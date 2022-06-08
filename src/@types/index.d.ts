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
	access?: boolean;
	favorite?: boolean;
}

export interface IChannel {
	id: string;
	name: string;
	type: number;
	deleted: boolean;
	guildID: string;
	guild: string;
	parentID: string;
	permissionOverwrites: string[];
	nsfw: boolean;
	position: number;
	rawPosition: number;
	topic: string|null;
	lastMessageID: string|null;
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
    features: string[];
}

export interface IMember {
	id: string;
	createdAt: number;
	communicationDisabledUntil: number;
	joinedAt: number;
	nick: string|null;
	roles: string[];
	permissions: number;
}