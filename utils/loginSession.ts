import { Browser } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Urls } from '../constants/Urls';
import { loginData } from '../test-data/loginData';

export const loginSessionFile = 'playwright/.auth/user.json';

export async function createLoginSession(browser: Browser): Promise<void> {
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  await page.goto(Urls.LOGIN);

  await loginPage.login(
    loginData.validMtsUser.username,
    loginData.validMtsUser.password
  );

  await page.getByText('Ognjen Filipovic').waitFor({ state: 'visible' });

  await context.storageState({
    path: loginSessionFile,
  });

  await context.close();
}