export default (req, res) => {
    const state = req.query.state;
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&prompt=none&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds${state ? `&state=${state}` : ''}`);
}