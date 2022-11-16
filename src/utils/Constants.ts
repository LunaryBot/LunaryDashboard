export const URLS = {
    USER: {
        general: [
            {
                label: 'Home',
                url: '/dashboard/@me',
                icon: 'fa-home'
            },
            {
                label: 'Servidores',
                url: '/dashboard/guilds',
                icon: 'fa-grip-vertical'
            }
        ]
    },
    GUILD: {
        general: [
            {
                label: 'Home',
                url: '/dashboard/guilds/[guild]/',
                icon: 'fa-home'
            },
            {
                label: 'Moderação',
                url: '/dashboard/guilds/[guild]/moderation',
                icon: 'fa-hammer'
            },
            {
                label: 'Permissões',
                url: '/dashboard/guilds/[guild]/permissions',
                icon: 'fa-briefcase'
            },
            {
                label: 'Embed de punições',
                url: '/dashboard/guilds/[guild]/punishment-embed',
                icon: 'fa-window-maximize'
            }
        ]
    }
}