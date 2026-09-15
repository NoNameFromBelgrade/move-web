import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class VideoClubPage extends BasePage {
  private readonly backButton: Locator;

  constructor(page: Page) {
    super(page);

    this.backButton = page.getByText("Nazad");
  }

  async clickOnBack(): Promise<void> {
    await this.clickOnElement(
      this.backButton,
      'Back button'
    );
  }
}