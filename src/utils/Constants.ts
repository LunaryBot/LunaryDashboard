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
                url: '/dashboard/guilds/[guild]',
                icon: 'fa-home'
            },
        ],
        moderation: [
            {
                label: 'Moderação',
                url: '/dashboard/guilds/[guild]/moderation',
                icon: 'fa-hammer'
            },
            {
                label: 'Motivos Pre-Definidos',
                url: '/dashboard/guilds/[guild]/reasons',
                icon: 'fa-sticky-note'
            },
            {
                label: 'Embed de punições',
                url: '/dashboard/guilds/[guild]/moderation/embed',
                icon: 'fa-window-maximize'
            }
        ],
        permissions: [
            {
                label: 'Permissões',
                url: '/dashboard/guilds/[guild]/permissions',
                icon: 'fa-briefcase'
            },
        ]
    }
}