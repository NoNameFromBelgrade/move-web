import { Urls } from '../constants/Urls';
import { test, expect } from '../fixtures/session';
import { profileData } from '../test-data/profileData';
import { generateProfileName } from '../utils/commonMethods';

test.describe('Create and delete profile', () => {

  test('User can create and delete profile', async ({ sessionPage, topBar, profilesPage, pinDialog, addProfilePage, settingsPage }) => {
    const profileName = generateProfileName();
    await sessionPage.goto(Urls.mojTv);

    // Open Profiles and create a new profile
    await topBar.openMenu();
    await topBar.clickOnProfiles();
    await profilesPage.clickOnAddProfile();
    await pinDialog.enterPin(profileData.pin);
    await addProfilePage.addProfile(profileName);

    // Verify that the profile was created successfully
    await expect(sessionPage.getByText(profileName)).toBeVisible();

    // Delete the created profile
    await topBar.openMenu();
    await topBar.clickOnSettings();
    await settingsPage.deleteProfile(profileName);

    // Verify that the profile was deleted successfully
    await expect(sessionPage.getByText(profileData.messages.deleteSuccess)).toBeVisible();
  });
});