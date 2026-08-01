import { test, expect} from '@playwright/test'

test('User List Test', async ({ request }) => {
    const list = await request.get('https://jsonplaceholder.typicode.com/users');
   
   expect(list.status()).toBe(200);

   const listRes = await list.json();
   expect(listRes).toBeDefined();

   const firstUser = listRes[0];
   expect(firstUser).toHaveProperty('name');
   expect(firstUser).toHaveProperty('email');
})