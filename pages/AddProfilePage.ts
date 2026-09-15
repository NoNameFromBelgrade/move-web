import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddProfilePage extends BasePage {
  private readonly profileNameInput: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);

    this.profileNameInput = page.locator("//label[text()='Unesi ime profila' or text()='Enter profile name']/following-sibling::input");
    this.saveButton = page.getByRole('button', { name: /Save|Sačuvaj/ });
  }

  /**
   * Enters the profile name into the Enter profile name field.
   * @param profileName - Profile name to enter.
   */
  async enterProfileName(profileName: string): Promise<void> {
    await this.fillElement(
      this.profileNameInput,
      profileName,
      'Enter profile name field'
    );
  }

  /**
   * Clicks the Save button.
   */
  async clickOnSave(): Promise<void> {
    await this.clickOnElement(
      this.saveButton,
      'Save button'
    );
  }

  /**
 * Adds a new profile with the provided profile name.
 * @param profileName - Name of the profile to add.
 */
  async addProfile(profileName: string): Promise<void> {
    await this.enterProfileName(profileName);
    await this.clickOnSave();
  }
}