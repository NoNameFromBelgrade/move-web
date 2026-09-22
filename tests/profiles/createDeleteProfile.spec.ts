import { Urls } from '../../constants/Urls';
import { test, expect } from '../../fixtures/session';
import { profileData } from '../../test-data/profileData';
import { generateProfileName } from '../../utils/commonMethods';

test.describe('Create and delete profile', () => {

  test('User can create and delete profile', async ({ sessionPage, topBarComponent, profilesPage, pinDialogComponent, addProfilePage, settingsProfilesPage }) => {
    const profileName = generateProfileName();
    await sessionPage.goto(Urls.mojTv);

    // Open Profiles and create a new profile
    await topBarComponent.openMenu();
    await topBarComponent.clickOnProfiles();
    await profilesPage.clickOnAddProfile();
    await pinDialogComponent.enterPin(profileData.pin);
    await addProfilePage.addProfile(profileName);

    // Verify that the profile was created successfully
    await expect(sessionPage.getByText(profileName)).toBeVisible();

    // Delete the created profile
    await topBarComponent.openMenu();
    await topBarComponent.clickOnSettings();
    await settingsProfilesPage.deleteProfile(profileName);

    // Verify that the profile was deleted successfully
    await expect(sessionPage.getByText(profileData.messages.deleteSuccess)).toBeVisible();
  });
});