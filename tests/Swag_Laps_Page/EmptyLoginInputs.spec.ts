import { test, expect } from '@playwright/test';

import {OpenAndLoginPage} from '../../Pages/SwagLaps/LoginPage';

test('Empty Login Inputs', async ({page}) => {

    const openAndLoginPage = new OpenAndLoginPage(page);

    await openAndLoginPage.OpenWebsite();
    await openAndLoginPage.Login('','');
    await openAndLoginPage.EmptyLoginInputsAssertions();
})