import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddReminderPage extends BasePage {
  private readonly closeButton: Locator;

  constructor(page: Page) {
    super(page);

    this.closeButton = page.getByLabel(/Zatvori podsetnik|Close reminder/);
  }

  async clickOnClose(): Promise<void> {
    await this.clickOnElement(
      this.closeButton,
      'Close button'
    );
  }
}