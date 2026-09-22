import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class VideoClubDetailsPage extends BasePage {
  private readonly backButton: Locator;
  private readonly playButton: Locator;

  constructor(page: Page) {
    super(page);

    this.backButton = page.getByText(/Nazad|Back/);
    this.playButton = page.getByText(/Gledaj|Play/);
  }

  async clickOnBack(): Promise<void> {
    await this.clickOnElement(
      this.backButton,
      'Back button'
    );
  }

  async clickOnPlay(): Promise<void> {
    await this.clickOnElement(
      this.playButton,
      'Play button'
    );
  }
}