import { test as base, Page, BrowserContext } from '@playwright/test';
import fs from 'fs';
import { createLoginSession, loginSessionFile } from '../utils/loginSession';
import { Urls } from '../constants/Urls';
import { TopBar } from '../pages/components/TopBar';
import { ProfilesPage } from '../pages/ProfilesPage';
import { PinDialog } from '../pages/components/PinDialog';
import { AddProfilePage } from '../pages/AddProfilePage';
import { SettingsPage } from '../pages/SettingsPage';

type Fixtures = {
  sessionPage: Page;
  topBar: TopBar;
  profilesPage: ProfilesPage;
  pinDialog: PinDialog;
  addProfilePage: AddProfilePage;
  settingsPage: SettingsPage;
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

    const loginFormVisible = await page.getByPlaceholder(/Korisničko ime|Username/).isVisible();

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

  topBar: async ({ sessionPage }, use) => {
    await use(new TopBar(sessionPage));
  },

  profilesPage: async ({ sessionPage }, use) => {
    await use(new ProfilesPage(sessionPage));
  },

  pinDialog: async ({ sessionPage }, use) => {
    await use(new PinDialog(sessionPage));
  },

  addProfilePage: async ({ sessionPage }, use) => {
    await use(new AddProfilePage(sessionPage));
  },

  settingsPage: async ({ sessionPage }, use) => {
    await use(new SettingsPage(sessionPage));
  },
});

export { expect } from '@playwright/test';