import generateOAuth2 from "../../../utils/generateOAuth2";
import { setCookie } from 'nookies';

export default (req, res) => {
    if(req.query.dt == "true") {
        setCookie({ res }, '__SessionLuny', '', {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            path: '/',
        });
    };

    const url = generateOAuth2({
        clientId: process.env.DISCORD_CLIENT_ID,
        redirect_uri: process.env.API_AUTH_CALLBACK,
        scopes: ["identify", "guilds"],
        state: req.query.state || null,
        prompt: "none"
    });

    res.redirect(url);
}