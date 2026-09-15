import { test, expect } from '../../fixtures/test';
import { Urls } from '../../constants/Urls';
import { loginData, providerOptions } from '../../test-data/loginData';
import { TopBar } from '../../pages/TopBar';

test.describe('Login', () => {

  test.afterEach(async ({ page, loginPage }) => {
    const loginFormVisible = await loginPage.isLoginFormVisible();

    if (!loginFormVisible) {
      const topBar = new TopBar(page);

      await topBar.logout();
    }
  });

  test('User can login with valid credentials', async ({ page, loginPage }) => {
    await page.goto(Urls.LOGIN);
    await loginPage.login(
      loginData.validMtsUser.username,
      loginData.validMtsUser.password
    );

    await expect(page.getByText("Ognjen Filipovic")).toBeVisible();
  });

  test('User cannot login with invalid credentials', async ({ page, loginPage }) => {
    await page.goto(Urls.LOGIN);

    await loginPage.login(
      loginData.invalidUser.username,
      loginData.invalidUser.password
    );

    await expect(page.getByText("Invalid Credentials!")).toBeVisible();
  });

  test('User cannot login with empty fields', async ({ page, loginPage }) => {
    await page.goto(Urls.LOGIN);

    await loginPage.login(
      loginData.emptyField.username,
      loginData.emptyField.password
    );

    await expect(page.getByText("Neispravno korisničko ime ili lozinka.")).toBeVisible();
  });

  test('User can login with Global account', async ({ page, loginPage }) => {
    await page.goto(Urls.LOGIN);

    await loginPage.login(
      loginData.globalUser.username,
      loginData.globalUser.password,
      'MOVE Global'
    );

    await expect(page.getByText("Test 1")).toBeVisible();
  });

  test('User cannot login with telekom account on Global', async ({ page, loginPage }) => {
    await page.goto(Urls.LOGIN);

    await loginPage.login(
      loginData.validTelekomUser.username,
      loginData.validTelekomUser.password,
      'MOVE Global'
    );

    await expect(page.getByText("Invalid Credentials!")).toBeVisible();
  });

  test('Provider dropdown contains all expected providers', async ({page, loginPage,}) => {
    await page.goto(Urls.LOGIN);
    await page.waitForTimeout(1000);
    const actualProviders = await loginPage.getProviderOptions();

    expect(actualProviders.map(provider => provider.trim())).toEqual(providerOptions);
  });

  test('User can open forgot password page', async ({ page, loginPage }) => {
    await page.goto(Urls.LOGIN);

    const forgotPasswordPagePromise = page.context().waitForEvent('page');
    await loginPage.openForgotPassword();
    const forgotPasswordPage = await forgotPasswordPagePromise;
    await forgotPasswordPage.waitForLoadState();

    await expect(forgotPasswordPage).toHaveTitle(/Zaboravljena lozinka - odabir opcije/);
  });

  test('User can show and hide password', async ({ page, loginPage }) => {
    await page.goto(Urls.LOGIN);

    await loginPage.enterPassword(loginData.validMtsUser.password);

    expect(await loginPage.getPasswordInputType()).toBe('password');

    await loginPage.togglePasswordVisibility();

    expect(await loginPage.getPasswordInputType()).toBe('text');

    await loginPage.togglePasswordVisibility();

    expect(await loginPage.getPasswordInputType()).toBe('password');
  });
});