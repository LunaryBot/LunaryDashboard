import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IGuild, IGuildData, IMember, IUser } from '../@types';

class APIUtils {
    public authorization: string;
    public axios: AxiosInstance;
    public guildId: string;

    constructor(authorization: string, baseURL: string, guildId?: string) {
        this.authorization = authorization;

        this.axios = axios.create({
            baseURL,
            headers: {
                Authorization: this.authorization
            }
        });

        this.guildId = guildId;
    }

    public async user(): Promise<IUser> {
        const response = await this.axios.get('/users/@me');

        return response.data;
    }

    public async connect(): Promise<{ user: IUser, guild?: IGuild, member?: IMember }> {
        const response = await this.axios.get(this.guildId ? `/guilds/${this.guildId}` : '/users/@me');
        
        return response.data;
    }

    public async guilds(): Promise<IGuildData[]> {
        const response = await this.axios.get('/users/@me/guilds');

        return response.data;
    }
}

export default APIUtils;