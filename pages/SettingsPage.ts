import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SettingsPage extends BasePage {
  private readonly profilesButton: Locator;

  constructor(page: Page) {
    super(page);

    this.profilesButton = page.getByText(/MOJI PROFILI|PROFILES/);
  }

  async clickOnProfiles(): Promise<void> {
    await this.clickOnElement(
      this.profilesButton,
      'Profiles button'
    );
  }
}