import {test, expect} from '@playwright/test';

test('Create and Delete User', async ({request})=>{

    

    const NewUser = await request.post(`https://reqres.in/api/users`, {
        data:{
            "name": 'Merit Dawood',
            "job" : 'Master Stundentin'
        }
    });

    expect(NewUser.status()).toBe(201);
    
    const NewUserResponse = await NewUser.json();
    console.log('New User Response Body:', NewUserResponse);
    expect(NewUserResponse.name)

    const NewUserID = NewUserResponse.id;
    console.log(`Genereted User ID is: ${NewUserID}`);

    const DeleteUser = await request.delete(`https://reqres.in/api/users/${NewUserID}`);
    expect(DeleteUser.status()).toBe(204);
    console.log(`User with ID ${NewUserID} has been deleted successfully`);

});