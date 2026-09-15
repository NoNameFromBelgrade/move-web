import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LiveTvPage extends BasePage {
  private readonly hideControlsButton: Locator;
  private readonly backButton: Locator;

  constructor(page: Page) {
    super(page);

    this.hideControlsButton = page.getByLabel(/Sakrij kontrole|Hide controls/);
    this.backButton = page.getByLabel(/Nazad|Back/);
  }

  async clickOnHideControls(): Promise<void> {
    await this.clickOnElement(
      this.hideControlsButton,
      'Hide controls button'
    );
  }

  async clickOnBack(): Promise<void> {
    await this.clickOnElement(
      this.backButton,
      'Back button'
    );
  }
}