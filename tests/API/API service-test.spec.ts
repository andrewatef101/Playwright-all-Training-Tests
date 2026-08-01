import {test, expect} from '@playwright/test';

import {AuthService} from '../../Pages/API POM SERVICES/AuthService';

test('API Einloggen', async ({request}) => {

    const authService = new AuthService(request);

    const userToken = await authService.LoginAndGetToken('emilys', 'emilyspass');
    expect (userToken).toBeDefined();
    
    const Profiledata = await authService.getProfile(userToken);
    expect (Profiledata.username).toBe('emilys');

})







