import { ChannelType } from 'discord-api-types/v10';

export interface AbstractGuild {
	id: string;
	name: string;
	icon: string | null;
	features: string[];
	owner: boolean;
	permissions: number;
}

export interface Channel {
	id: string;
	name: string;
	type: ChannelType;
	parent_id: string | null;
	position: number;
	nsfw: boolean | null;
}

export interface Guild {
	id: string;
	name: string;
	owner_id: string;
	banner: string | null;
	features: string[];
	icon: string | null;
	channels: Channel[];
	roles: Role[];
}

export interface Role {
	id: string;
	name: string;
	permissions: number;
	color: number | null;
	hoist: boolean;
	managed: boolean;
	mentionable: boolean;
	position: number;
}

export interface User {
	id: string;
	username: string;
	discriminator: string;
	avatar: string | null;
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

export interface UserWithGuilds extends User {
	guilds: AbstractGuild[] | null;
}