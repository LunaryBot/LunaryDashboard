import { NextApiResponse, NextApiRequest } from 'next';
import initializerFirebases from '../../../../Utils/initializerFirebase';
import { LogData, Log } from '../../../../types';
import chunk from '../../../../Utils/chunk';
import getUser from '../../../../Utils/getUser';

interface headersGet {
    token: string;
    requesterId: string;
    userId: string;
    authorId: string;
    logId: string;
    chunk: number;
    limit: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == "GET") {
        const guildId = req.query.guild as string;
        const { requesterId, token, authorId, userId, logId, chunk: _chunk = 0, limit = 20 }: headersGet = req.headers as any;

        if(!token) {
            return res.json({
                status: 401,
                statusText: "No token provided"
            });
        };

        if(!global.tokens?.[token] || (global.tokens?.[token] && global.tokens[token].guild != guildId)) {
            return res.json({
                status: 401,
                statusText: "Invalid token"
            });
        };

        const dbs = initializerFirebases();

        let logs: LogData[] = Object.entries((await dbs.logs.ref().once('value')).val() || {}).map(
            function([k, v]: [string, string], i) {
                const data = JSON.parse(Buffer.from(v, 'base64').toString('ascii'))
                data.id = k
                return data
            })
            .filter(x => x.server == guildId)
            .sort((a, b) => b.date - a.date) || [];

        if(userId) logs = logs.filter(x => x.user == userId);
        if(authorId) logs = logs.filter(x => x.author == authorId);
        if(logId) logs = logs.filter(x => x.id == logId);

        const chunks = chunk(logs, limit)

        logs = chunks[_chunk > 1 ? 1 : 0] || []

        const _logs = (await Promise.all(await logs.map(async function(log: LogData) {
            const data  = { 
                ...log,
                reason: decodeURIComponent(log.reason),
                user: (await getUser(log.user)),
                author: (await getUser(log.author)),
            }

            return data
        })));

        const { token: _token } = global.tokens[token];

        const newToken = `${Number(requesterId).toString(12)}-${Number(guildId).toString(36)}-${Math.random().toString(36).split(".")[1]}`

        delete global.tokens[token];

        global.tokens[newToken] = {
            user: userId,
            guild: guildId,
            token: _token
        };

        return res.json({
            status: 200,
            statusText: "Ok",
            data: {
                userId,
                authorId,
                logId,
                logs: _logs,
                token: newToken
            }
        });
    } else return res.json({
        status: 405,
        statusText: 'Method Not Allowed'
    });
}