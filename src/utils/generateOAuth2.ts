import { Tscope, URLS } from "../types";

interface DiscordOAuth2 {
    clientId: string;
    scopes: Tscope[];
    permissions?: bigint | number;
    guildId?: string;
    redirect_uri?: string;
    state?: string;
    response_type?: string;
    prompt?: string;
    disableGuildSelect?: boolean;
}

function generateOAuth2({
    clientId = process.env.DISCORD_CLIENT_ID,
    scopes,
    permissions = BigInt(0),
    guildId = null,
    redirect_uri = "/",
    response_type = "code",
    state = null,
    disableGuildSelect = false,  
    prompt = null
}: DiscordOAuth2) {
    const query = new URLSearchParams({
        client_id: clientId,
        scope: scopes.join(" "),
    });

    if (permissions) {
        query.set("permissions", Number(permissions).toString());
    };

    if (guildId) {
        query.set("guild_id", guildId);
        if(disableGuildSelect) {
            query.set("disable_guild_select", "true");
        }
    };

    if(redirect_uri) {
        query.set("redirect_uri", redirect_uri);
        query.set("response_type", response_type);
        if(state) {
            query.set("state", state);
        };
        if(prompt) {
            query.set("prompt", prompt);
        };
    };

    return `${URLS.BASE}?${query.toString()}`;
}

export default generateOAuth2;