import { test, expect } from '@playwright/test';

import {OpenAndLoginPage} from '../../Pages/SwagLaps/LoginPage';

test('Unhappy Login', async ({page}) => {

    const openAndLoginPage = new OpenAndLoginPage(page);

    await openAndLoginPage.OpenWebsite();
    await openAndLoginPage.Login('standard_user', 'standard_user');
    await openAndLoginPage.FalseDataErrorAssertions();
})

