import { NextApiResponse, NextApiRequest } from 'next';
import initializerFirebases from '../../../../Utils/initializerFirebase';
import { LogData, Log } from '../../../../types';
import chunk from '../../../../Utils/chunk';
import getUser from '../../../../Utils/getUser';
import decode from '../../../../Utils/decode';

interface headersGet {
    token: string;
    requesterId: string;
    chunk: number;
    limit: number;
    filters: string;
    id: string;
}

const punishmentsTypes = {
    ban: 1,
    b: 1,
    kick: 2,
    k: 2,
    mute: 3,
    m: 3,
    adv: 4,
    a: 4,
    warn: 4,
    w: 4,
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method == "GET") {
        const guildId = req.query.guild as string;
        const { requesterId, token, id, filters, chunk: _chunk = 0, limit = 20 }: headersGet = req.headers as any;

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
            
        if(id) {
            logs = logs.filter(x => x.id == id.toLowerCase?.());
        } else if(filters) {
            const { userId, authorId, type }: any = decode(typeof filters == "string" ? filters : "");
            
            if(userId) logs = logs.filter(x => x.user == userId);
            if(authorId) logs = logs.filter(x => x.author == authorId);    
            if(type) logs = logs.filter(x => x.type == (Number(type) || punishmentsTypes[type]));    
        }

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
            user: requesterId,
            guild: guildId,
            token: _token
        };

        return res.json({
            status: 200,
            statusText: "Ok",
            data: {
                filters: typeof filters == "string" ? decode(filters.toString()) : {},
                logs: _logs,
                token: newToken
            }
        });
    } else return res.json({
        status: 405,
        statusText: 'Method Not Allowed'
    });
}