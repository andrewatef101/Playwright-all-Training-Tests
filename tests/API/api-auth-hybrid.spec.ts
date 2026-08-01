import { test, expect} from '@playwright/test'

test('API Einloggen', async ({request}) => {
    const response = await request.post('https://dummyjson.com/auth/login' , {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {        
        username: 'emilys', 
        password: 'emilyspass'
    }
    })
    expect(response.status()).toBe(200);

    const ResBody = await response.json();
    expect (ResBody).toHaveProperty('accessToken');

    const userToken = ResBody.token || ResBody.accessToken;
    expect (userToken).toBeDefined();


    const VerfiUserdata = await request.get('https://dummyjson.com/auth/me' , {
        headers: {
            'Authorization': `Bearer ${userToken}`
            }
})
        
    expect (VerfiUserdata.status()).toBe(200);

    const VerfiResBody = await VerfiUserdata.json();
    expect (VerfiResBody.username).toBe('emilys');
})
