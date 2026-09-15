import { test as base, Page, BrowserContext } from '@playwright/test';
import fs from 'fs';
import { createLoginSession, loginSessionFile } from '../utils/loginSession';
import { Urls } from '../constants/Urls';

type Fixtures = {
  sessionPage: Page;
};

export const test = base.extend<Fixtures>({
  sessionPage: async ({ browser }, use) => {
    let context: BrowserContext;
    let page: Page;

    // Create authentication state if it does not exist.
    if (!fs.existsSync(loginSessionFile)) {
      await createLoginSession(browser);
    }

    // Try existing authentication state.
    context = await browser.newContext({
      storageState: loginSessionFile,
    });

    page = await context.newPage();

    await page.goto(Urls.LOGIN);

    await page.waitForTimeout(1000); // Bez ovoga nece da radi

    const loginFormVisible = await page.getByPlaceholder('Korisničko ime').isVisible();

    // If the session is invalid/expired, application redirects to login.
    if (loginFormVisible) {
      await context.close();

      // Create a fresh authentication state.
      await createLoginSession(browser);

      context = await browser.newContext({
        storageState: loginSessionFile,
      });

      page = await context.newPage();
    }

    await use(page);

    await context.close();
  },
});

export { expect } from '@playwright/test';