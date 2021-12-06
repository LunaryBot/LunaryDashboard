import { NextApiResponse, NextApiRequest } from 'next';
import { scopes, URLS, TokenData } from '../../../types';
import nookies from 'nookies';
import { encode } from '../../../Utils/encode';
import axios from 'axios';
require('dotenv').config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const state = req.query.state;

	res.redirect(`/api/auth/login${state ? `?state=${state}` : ''}`);
}