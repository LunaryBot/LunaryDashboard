import { NextApiResponse, NextApiRequest } from 'next';

interface bodyPatch {
    token: string;
    data: object;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == "PATCH") {
        const guildId = req.query.guild as string;
        const { token, data }: bodyPatch = req.body as any;
        
        if(!token) {
            return res.json({
                status: 401,
                statusText: "No token provided"
            });
        };

        console.log(global.tokens?.[token]);

        if(!global.tokens?.[token] || (global.tokens?.[token] && global.tokens[token].guild != guildId)) {
            return res.json({
                status: 401,
                statusText: "Invalid token"
            });
        };


        if(!data) return res.json({
            status: 400,
            statusText: "No data provided"
        });

        const { user: userId, token: _token } = global.tokens[token];

        console.log(data)

        const newToken = `${Number(userId).toString(12)}-${Number(guildId).toString(36)}-${Math.random().toString(36).split(".")[1]}`

        delete global.tokens[token];

        global.tokens[newToken] = {
            userId: userId,
            guild: guildId,
            token: _token
        };

        return res.json({
            status: 200,
            statusText: "Ok",
            data: {
                token: newToken
            }
        });
    } else return res.json({
        status: 405,
        statusText: 'Method Not Allowed'
    });
}