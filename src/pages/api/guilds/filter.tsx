import { NextApiResponse, NextApiRequest } from 'next';
import axios from 'axios';
require('dotenv').config();
const guildsIds = [
    '507596261680087080', '540606502180749313',
    '566687048413609991', '730047147860295732',
    '759526105669042176', '777332295836368917',
    '777549351895302166', '780556875284217867',
    '781219610204438549', '786020613633474580',
    '787667696077504552', '796138214415007744',
    '800136804124590091', '801465354131210250',
    '808377386160619570', '814254608658464830',
    '816414958060437544', '817441746488787004',
    '826844594352029726', '869916717122469898',
    '872259645845164093'
]

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let { guilds }: { guilds: string } = req.headers as any;

    if (!guilds) {
        res.status(400).json({
            statusCode: 400,
            message: 'Bad Request'
        })
        return;
    }
    
    const _guilds = guilds.split(',').filter(guild => guildsIds.includes(guild));

    res.status(200).json({
        statusCode: 200,
        statusText: 'OK',
        data: {
            guilds: _guilds
        }
    })
}