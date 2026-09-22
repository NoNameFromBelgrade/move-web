import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EditProfilePage extends BasePage {
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
    this.profileNameInput.clear();
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
 * Edit the profile name and save the changes.
 * @param profileName - New name to assign to the profile.
 */
  async editProfile(profileName: string): Promise<void> {
    await this.enterProfileName(profileName);
    await this.clickOnSave();
  }
}