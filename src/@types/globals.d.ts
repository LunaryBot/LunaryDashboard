export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_CLIENT_ID: string;
            OAUTH2_DISCORD_REDIRECT_URI: string;
            API_URL: string;
            NODE_ENV: 'development' | 'production';
        }
    }

    interface Window {
        changeMode: (mode: "dark" | "light") => void;
        toggleFavorite: (guildID: string) => void;
    }
}