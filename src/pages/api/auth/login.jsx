export default (req, res) => {
    res.redirect('https://discord.com/api/oauth2/authorize?client_id=853443561039331379&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds');
}