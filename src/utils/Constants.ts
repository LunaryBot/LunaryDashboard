export const URLS = {
    USER: {
        general: [
            {
                label: 'Home',
                url: '/dashboard/@me',
                icon: 'far fa-home'
            },
            {
                label: 'Servidores',
                url: '/dashboard/guilds',
                icon: 'far fa-grip-vertical'
            }
        ]
    },
    GUILD: {
        general: [
            {
                label: 'Home',
                url: '/dashboard/guilds/[guild]/',
                icon: 'far fa-home'
            },
            {
                label: 'Moderação',
                url: '/dashboard/guilds/[guild]/moderation',
                icon: 'far fa-hammer'
            }
        ]
    }
}

export const ChannelTypes = {
    GUILD_TEXT: 0,
    DM: 1,
    GUILD_VOICE: 2,
    GROUP_DM: 3,
    GUILD_CATEGORY: 4,
    GUILD_NEWS: 5,
    GUILD_STORE: 6,
    GUILD_NEWS_THREAD: 10,
    GUILD_PUBLIC_THREAD: 11,
    GUILD_PRIVATE_THREAD: 12,
    GUILD_STAGE_VOICE: 13,
    GUILD_DIRECTORY: 14,
    GUILD_FORUM: 15,
}