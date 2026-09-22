import { Urls } from '../../constants/Urls';
import { test, expect } from '../../fixtures/session';
import { profileData } from '../../test-data/profileData';
import { loginData } from '../../test-data/loginData';
import { generateProfileName } from '../../utils/commonMethods';

test.describe('Edit Profile', () => {
  let currentProfileName: string;

  test.beforeEach(async ({
    sessionPage,
    topBarComponent,
    profilesPage,
    pinDialogComponent,
    addProfilePage,
  }) => {
    currentProfileName = generateProfileName();

    await sessionPage.goto(Urls.mojTv);

    // Open Profiles and create a new profile
    await topBarComponent.openMenu();
    await topBarComponent.clickOnProfiles();
    await profilesPage.clickOnAddProfile();
    await pinDialogComponent.enterPin(profileData.pin);
    await addProfilePage.addProfile(currentProfileName);
  });

  test.afterEach(async ({
    sessionPage,
    topBarComponent,
    profilesPage,
    settingsProfilesPage,
  }) => {
    // Return to the admin profile before deleting the test profile
    await sessionPage.goto(Urls.mojTv);

    await topBarComponent.openMenu();
    await topBarComponent.clickOnProfiles();
    await profilesPage.clickOnProfile(profileData.adminProfileName);

    // Delete the test profile
    await topBarComponent.openMenu();
    await topBarComponent.clickOnSettings();
    await settingsProfilesPage.deleteProfile(currentProfileName);
  });

  test('User can edit profile PIN', async ({
    sessionPage,
    topBarComponent,
    settingsProfilesPage,
    pinDialogComponent,
  }) => {
    // Open profile settings
    await topBarComponent.openMenu();
    await topBarComponent.clickOnSettings();
    await settingsProfilesPage.clickOnProfiles();
    await settingsProfilesPage.clickOnProfile(currentProfileName);

    // Set profile PIN
    await settingsProfilesPage.clickOnSetProfilePin();
    await pinDialogComponent.enterPin(profileData.pin);

    // Verify that the PIN was set successfully
    await expect(
      sessionPage.getByText(profileData.messages.pinSetSuccess)
    ).toBeVisible();
  });

  test('User can edit parental control', async ({
    sessionPage,
    topBarComponent,
    settingsProfilesPage,
    pinDialogComponent,
  }) => {
    // Open profile settings
    await topBarComponent.openMenu();
    await topBarComponent.clickOnSettings();
    await settingsProfilesPage.clickOnProfiles();
    await settingsProfilesPage.clickOnProfile(currentProfileName);

    // Edit parental control
    await settingsProfilesPage.clickOnParentalControlMenu();
    await settingsProfilesPage.clickOnParentalControl();
    await pinDialogComponent.enterPin(profileData.pin);
    await settingsProfilesPage.setParentalControl(
      profileData.parentalControl.r16
    );

    // Verify that the parental control was set successfully
    await expect(
      sessionPage
        .getByRole('button', { name: 'R16', exact: true })
        .locator(
          'span.flex.h-5.w-5.shrink-0.items-center.justify-center.rounded-full.border-2.transition-colors.border-brand.bg-brand'
        )
    ).toBeVisible();
  });

  test('User can edit profile name', async ({
    sessionPage,
    topBarComponent,
    settingsProfilesPage,
    editProfilePage,
  }) => {
    const newProfileName = generateProfileName();

    // Open profile settings
    await topBarComponent.openMenu();
    await topBarComponent.clickOnSettings();
    await settingsProfilesPage.clickOnProfiles();
    await settingsProfilesPage.clickOnProfile(currentProfileName);

    // Change profile name
    await settingsProfilesPage.clickOnChangeProfileMenu();

    currentProfileName = newProfileName;

    await editProfilePage.editProfile(newProfileName);

    // Verify that the profile name was edited successfully
    await expect(
      sessionPage.getByText(newProfileName)
    ).toBeVisible();
  });

  test('User can set profile as default', async ({
    sessionPage,
    topBarComponent,
    settingsProfilesPage,
    loginPage,
  }) => {
    // Open profile settings
    await topBarComponent.openMenu();
    await topBarComponent.clickOnSettings();
    await settingsProfilesPage.clickOnProfiles();
    await settingsProfilesPage.clickOnProfile(currentProfileName);

    // Set profile as default
    await settingsProfilesPage.clickOnDefaultProfileMenu();
    await settingsProfilesPage.setProfileAsDefault(currentProfileName);

    // Logout and login again
    await topBarComponent.logout();

    await loginPage.login(
      loginData.validMtsUser.username,
      loginData.validMtsUser.password
    );

    // Verify that the profile was set as default
    await expect(
      sessionPage.getByText(currentProfileName)
    ).toBeVisible();
  });
});