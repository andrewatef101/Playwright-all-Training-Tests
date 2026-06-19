import {test, expect} from '@playwright/test';

test('Creat User', async ({request}) => {

    const NewUser = await request.post(`https://reqres.in/api/users`, {
        data:{
            "name": 'Andrew Ibrahim' , 
            'job': 'QA Automation Engineer'
        }

    });
    expect(NewUser.status()).toBe(201);

    const NewUserBody = await NewUser.json();
    console.log('POST New User Body' , NewUserBody);

    const NewUserID = NewUserBody.id;
    console.log(`Generated User ID is: ${NewUserID}`);

    const getUserResponse = await request.get(`https://reqres.in/api/users/${NewUserID}`);
    expect(getUserResponse.status()).toBe(200);

    console.log(`Get Request Status for Id ${NewUserID}: ${getUserResponse.status()}`);
    
});