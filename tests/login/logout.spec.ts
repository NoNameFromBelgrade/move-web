import { Urls } from '../../constants/Urls';
import { test, expect } from '../../fixtures/session';
import { TopBar } from '../../pages/TopBar';

test.describe('Logout', () => {
  test('User can logout', async ({ sessionPage }) => {
    const topBar = new TopBar(sessionPage);

    await sessionPage.goto(Urls.mojTv);

    await topBar.logout();

    await expect(sessionPage.getByPlaceholder('Korisničko ime')).toBeVisible();
  });
});