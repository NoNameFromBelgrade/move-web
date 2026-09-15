import { Urls } from '../constants/Urls';
import { test, expect } from '../fixtures/session';
import { TopBar } from '../pages/TopBar';
import { ProfilesPage } from '../pages/ProfilesPage';
import { PinDialog } from '../pages/PinDialog';
import { AddProfilePage } from '../pages/AddProfilePage';

test.describe('Add profile', () => {

  test('User can add profile', async ({ sessionPage }) => {
    const topBar = new TopBar(sessionPage);
    const profilesPage = new ProfilesPage(sessionPage);
    const pinDialog = new PinDialog(sessionPage);
    const addProfile = new AddProfilePage(sessionPage);

    await sessionPage.goto(Urls.mojTv);

    await topBar.openMenu();
    await topBar.clickOnProfiles();
    await profilesPage.clickOnAddProfile();
    await pinDialog.enterPin('1', '2', '3', '4');
    await addProfile.addProfile('Novi profil');

    await expect(sessionPage.getByText('Novi profil')).toBeVisible();
  });
});