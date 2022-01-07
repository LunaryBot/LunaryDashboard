import generateOAuth2 from "../../../Utils/generateOAuth2";

export default (req, res) => {
    const url = generateOAuth2({
        clientId: process.env.DISCORD_CLIENT_ID,
        redirect_uri: process.env.API_AUTH_CALLBACK,
        scopes: ["identify", "guilds"],
        state: req.query.state || null,
        prompt: "none"
    })

    res.redirect(url);
}