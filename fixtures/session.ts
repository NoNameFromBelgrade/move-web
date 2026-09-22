import { test as base, Page, BrowserContext } from '@playwright/test';
import fs from 'fs';
import { createLoginSession, loginSessionFile } from '../utils/loginSession';
import { Urls } from '../constants/Urls';
import { TopBarComponent } from '../pages/components/TopBarComponent';
import { ProfilesPage } from '../pages/ProfilesPage';
import { PinDialogComponent } from '../pages/components/PinDialogComponent';
import { AddProfilePage } from '../pages/AddProfilePage';
import { SettingsPage } from '../pages/SettingsPage';
import { SettingsProfilesPage } from '../pages/SettingsProfilesPage';
import { EditProfilePage } from '../pages/EditProfilePage';
import { LoginPage } from '../pages/LoginPage';

type Fixtures = {
  sessionPage: Page;
  topBarComponent: TopBarComponent;
  profilesPage: ProfilesPage;
  pinDialogComponent: PinDialogComponent;
  addProfilePage: AddProfilePage;
  settingsPage: SettingsPage;
  settingsProfilesPage: SettingsProfilesPage;
  editProfilePage: EditProfilePage;
  loginPage: LoginPage;
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

  topBarComponent: async ({ sessionPage }, use) => {
    await use(new TopBarComponent(sessionPage));
  },

  profilesPage: async ({ sessionPage }, use) => {
    await use(new ProfilesPage(sessionPage));
  },

  pinDialogComponent: async ({ sessionPage }, use) => {
    await use(new PinDialogComponent(sessionPage));
  },

  addProfilePage: async ({ sessionPage }, use) => {
    await use(new AddProfilePage(sessionPage));
  },

  settingsPage: async ({ sessionPage }, use) => {
    await use(new SettingsPage(sessionPage));
  },

  settingsProfilesPage: async ({ sessionPage }, use) => {
    await use(new SettingsProfilesPage(sessionPage));
  },

  editProfilePage: async ({ sessionPage }, use) => {
    await use(new EditProfilePage(sessionPage));
  },

  loginPage: async ({ sessionPage }, use) => {
    await use(new LoginPage(sessionPage));
  },
});

export { expect } from '@playwright/test';