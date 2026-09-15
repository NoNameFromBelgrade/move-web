import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TopBar extends BasePage {
  private readonly profileMenuButton: Locator;
  private readonly profilesButton: Locator;
  private readonly logoutButton: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);

    this.profileMenuButton = page.getByLabel('Otvori meni naloga');
    this.profilesButton = page.getByText('Profili');
    this.logoutButton = page.getByRole('button', { name: /Odjava|Logout/ });
    this.searchButton = page.getByLabel('Otvori pretragu');
  }

  async openMenu(): Promise<void> {
    await this.clickOnElement(
      this.profileMenuButton,
      'Profile menu button'
    );
  }

  async clickOnProfiles(): Promise<void> {
    await this.clickOnElement(
      this.profilesButton,
      'Profiles button'
    );
  }

  async logout(): Promise<void> {
    await this.openMenu();

    await this.clickOnElement(
      this.logoutButton,
      'Odjava button'
    );
  }

  async clickOnSearch(): Promise<void> {
    await this.clickOnElement(
      this.searchButton,
      'Search button'
    );
  }
}