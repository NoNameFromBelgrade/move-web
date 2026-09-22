import { Urls } from '../../constants/Urls';
import { test, expect } from '../../fixtures/session';
import { TopBarComponent } from '../../pages/components/TopBarComponent';

test.describe('Logout', () => {
  test('User can logout', async ({ sessionPage }) => {
    const topBar = new TopBarComponent(sessionPage);

    await sessionPage.goto(Urls.mojTv);

    await topBar.logout();

    await expect(sessionPage.getByPlaceholder('Korisničko ime')).toBeVisible();
  });
});