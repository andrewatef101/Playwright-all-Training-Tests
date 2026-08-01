import { test, expect} from '@playwright/test'

test("Löschen von User", async ({request}) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    expect (response.status()).toBe(200);

    const LöchBestätigung = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect (LöchBestätigung.status()).toBe(404);
})