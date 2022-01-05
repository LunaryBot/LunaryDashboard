export default (req, res) => {
    const state = req.query.state;
    const callbackURL = process.env.API_AUTH_CALLBACK;

    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&prompt=none&redirect_uri=${encodeURI(callbackURL)}&response_type=code&scope=identify%20guilds${state ? `&state=${state}` : ''}`);
}