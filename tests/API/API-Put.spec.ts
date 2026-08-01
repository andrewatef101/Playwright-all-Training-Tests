import { test, expect} from '@playwright/test'

test('Aktualisierung von Trackdaten', async ({request}) =>{
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1' , {
        data: {
            "id": 1,
            "title": "Aktualisierter Track 2026",
            "body": "Bearbetete GVL Daten",
            "userID": 1
        }
    })
    expect(response.status()).toBe(200);

    const ResBody = await response.json();
    expect(ResBody.title).toBe('Aktualisierter Track 2026');
    expect(ResBody.body).toBe('Bearbetete GVL Daten');

})