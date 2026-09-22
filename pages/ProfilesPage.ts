import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilesPage extends BasePage {
  private readonly addProfileButton: Locator;

  constructor(page: Page) {
    super(page);

    this.addProfileButton = page.getByLabel(/Dodaj profil|Add profile/);
  }

  async clickOnAddProfile(): Promise<void> {
    await this.clickOnElement(
      this.addProfileButton,
      'Add profile button'
    );
  }

  async clickOnProfile(profileName: string): Promise<void> {
    await this.clickOnElement(
      this.page.getByLabel('Izaberi profil ' + profileName),
      `Click on profile: ${profileName}`
    );
  }
}