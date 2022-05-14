import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IUser } from '../@types';

class APIUtils {
    public authorization: string;
    public axios: AxiosInstance;

    constructor(authorization: string, baseURL: string) {
        this.authorization = authorization;

        this.axios = axios.create({
            baseURL,
            headers: {
                Authorization: this.authorization
            }
        });

        console.log(baseURL);
    }

    public async user(): Promise<IUser> {
        const response = await this.axios.get('/users/@me');

        return response.data;
    }
}

export default APIUtils;