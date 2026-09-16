import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SettingsPage extends BasePage {
  private readonly profilesButton: Locator;
  private readonly deleteProfileButton: Locator;
  private readonly confirmDeleteProfileButton: Locator;
  private readonly yesButton: Locator;

  constructor(page: Page) {
    super(page);

    this.profilesButton = page.getByText(/MOJI PROFILI|PROFILES/);
    this.deleteProfileButton = page.getByRole('button', { name: /Obriši profil|Delete profile/ });
    this.confirmDeleteProfileButton = page.locator("//button[span[text()='Delete profile']]");
    this.yesButton = page.getByRole('button', { name: /Da|Yes/});
  }

  async clickOnProfiles(): Promise<void> {
    await this.clickOnElement(
      this.profilesButton,
      'Profiles button'
    );
  }

  private getProfileButton(profileName: string): Locator {
    return this.page.getByRole('button', {
        name: `Select profile ${profileName}`,
    });
  }

  async clickOnProfile(profileName: string): Promise<void> {
    await this.clickOnElement(
      this.getProfileButton(profileName),
      `Profile: ${profileName}`
    );
  }

  async clickOnDeleteProfile(): Promise<void> {
    await this.clickOnElement(
      this.deleteProfileButton,
      'Delete profile button'
    );
  }

  async clickOnConfirmDeleteProfile(): Promise<void> {
    await this.clickOnElement(
      this.confirmDeleteProfileButton,
      'Confirm delete profile button'
    );
  }

  async clickOnYes(): Promise<void> {
    await this.clickOnElement(
      this.yesButton,
      'Yes button'
    );
  }

  async deleteProfile(profileName: string): Promise<void> {
    await this.clickOnProfiles();
    await this.clickOnProfile(profileName);
    await this.clickOnDeleteProfile();
    await this.clickOnConfirmDeleteProfile();
    await this.clickOnYes();
  }
}