import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SettingsProfilesPage extends BasePage {
  private readonly profilesButton: Locator;
  private readonly setProfilePinMenuButton: Locator;
  private readonly setProfilePinButton: Locator;
  private readonly parentalControlMenuButton: Locator;
  private readonly parentalControlButton: Locator;
  private readonly changeProfileMenuButton: Locator;
  private readonly defaultProfileMenuButton: Locator;
  private readonly deleteProfileMenuButton: Locator;
  private readonly deleteProfileButton: Locator;
  private readonly yesButton: Locator;

  constructor(page: Page) {
    super(page);

    this.profilesButton = page.getByText(/MOJI PROFILI|PROFILES/);
    this.setProfilePinMenuButton = page.getByRole('button', { name: /Podesi PIN profila|Set profile pin/ });
    this.setProfilePinButton = page.locator("//button[span[text()='Podesi PIN za pristup profilu' or text()='Set profile PIN']]");
    this.parentalControlMenuButton = page.getByRole('button', { name: /Izaberi nivo roditeljske kontrole|Parental control/ });
    this.parentalControlButton = page.locator("//button[span[text()='Nivo roditeljske kontrole' or text()='Parental control']]");
    this.changeProfileMenuButton = page.getByRole('button', { name: /Izmeni profil|Change profile/ });
    this.defaultProfileMenuButton = page.getByRole('button', { name: /Podrazumevani profil|Default profile/});
    this.deleteProfileMenuButton = page.getByRole('button', { name: /Obriši profil|Delete profile/ });
    this.deleteProfileButton = page.locator("//button[span[text()='Obriši profil' or text()='Delete profile']]");
    this.yesButton = page.getByRole('button', { name: /Da|Yes/});
  }

  async clickOnProfiles(): Promise<void> {
    await this.clickOnElement(
      this.profilesButton,
      'Profiles button'
    );
  }

  async clickOnSetProfilePinMenu(): Promise<void> {
    await this.clickOnElement(
      this.setProfilePinMenuButton,
      'Set profile pin menu button'
    );
  }

  async clickOnSetProfilePin(): Promise<void> {
    await this.clickOnElement(
      this.setProfilePinButton,
      'Set profile pin button'
    );
  }

  async clickOnChangeProfileMenu(): Promise<void> {
    await this.clickOnElement(
      this.changeProfileMenuButton,
      'Change profile menu button'
    );
  }

  async clickOnDefaultProfileMenu(): Promise<void> {
    await this.clickOnElement(
      this.defaultProfileMenuButton,
      'Default profile menu button'
    );
  }

  async setProfileAsDefault(profileName: string): Promise<void> {
    await this.clickOnElement(
      this.page.locator('button:not([aria-label])').filter({ hasText: profileName }),
      `New default profile: ${profileName}`
    );
  }

  async clickOnParentalControl(): Promise<void> {
    await this.clickOnElement(
      this.parentalControlButton,
      'Parental control button'
    );
  }

  async setParentalControl(parentalControl: string): Promise<void> {
    await this.clickOnElement(
      this.page.getByRole('button', { name: parentalControl }),
      `Parental control: ${parentalControl}`
    );
  }

  async clickOnParentalControlMenu(): Promise<void> {
    await this.clickOnElement(
      this.parentalControlMenuButton,
      'Parental control menu button'
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

  async clickOnDeleteProfileMenu(): Promise<void> {
    await this.clickOnElement(
      this.deleteProfileMenuButton,
      'Delete profile menu button'
    );
  }

  async clickOnDeleteProfile(): Promise<void> {
    await this.clickOnElement(
      this.deleteProfileButton,
      'Delete profile button'
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
    await this.clickOnDeleteProfileMenu();
    await this.clickOnDeleteProfile();
    await this.clickOnYes();
  }
}