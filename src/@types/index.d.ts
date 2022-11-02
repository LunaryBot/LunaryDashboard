export interface AbstractGuild {
	id: string;
	name: string;
	icon: string | null;
	features: string[];
	owner: boolean;
	permissions: number;
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