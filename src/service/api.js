import { BaseApi, ApiResult } from './baseApi';


class Api extends BaseApi {
    async login(
        email,
        password) {
        return this.post('user/jwt/create/', {
            email,
            password
        });
    }
    
    async refreshToken(
        refresh) {
        return this.post('user/jwt/refresh/', {
            refresh
        });
    }
    async getList(
        token,
        offset) {
        return this.get(`product/?limit=${10}&offset=${offset}`, {
            headers: {
                authorization: `JWT ${token}`
            }
        });
    }
}

export const api = new Api();