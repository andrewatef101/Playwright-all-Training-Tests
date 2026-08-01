import {test, expect} from '@playwright/test';

test ('Erstellung von neuen Tracklist', async ({request}) => {
    const response = await request.post ('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: "Neuer Track 2026",
            body: "GVL Verifijarionsdatabase",
            userID: 1
        }
    })
    expect(response.status()).toBe(201);

    const resBody = await response.json();
    expect(resBody).toHaveProperty('id');
    expect(resBody.title).toBe('Neuer Track 2026');

   

})