import {APIRequestContext, expect} from 'playwright/test';

export class AuthService {

    request: APIRequestContext;
    baseURL: string = 'https://dummyjson.com';

  constructor (request: APIRequestContext) {
    this.request = request;
  }

  async LoginAndGetToken(username: string, password: string) {
    const response = await this.request.post(`${this.baseURL}/auth/login`, {
        headers: {
            'contentType': 'application/json',
        },
        data: {
            username:  username,
            password:  password,
        }
        });
        
        expect(response.ok()).toBeTruthy();
        const RespBody = await response.json();
        return RespBody.token || RespBody.accessToken;
        

  }
async getProfile(token: string) {
    const response = await this.request.get(`${this.baseURL}/auth/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    expect(response.ok()).toBeTruthy();
    return await response.json();
    
}
}