import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly forgotPasswordLink: Locator;
  private readonly providerDropdown: Locator;
  private readonly passwordVisibilityButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByPlaceholder(/Korisničko ime|Username/);
    this.passwordInput = page.getByPlaceholder(/Lozinka|Password/);
    this.loginButton = page.getByRole('button', { name: /Prijavi se|Login/ });
    this.forgotPasswordLink = page.getByText('Zaboravljena lozinka');
    this.providerDropdown = page.locator('select');
    this.passwordVisibilityButton = this.passwordInput.locator('xpath=./following-sibling::button');
  }

  /**
   * Enters the username into the username field.
   * @param username - Username to enter.
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillElement(
      this.usernameInput,
      username,
      'Username field'
    );
  }

  /**
   * Enters the password into the password field.
   * @param password - Password to enter.
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillElement(
      this.passwordInput,
      password,
      'Password field'
    );
  }

  /**
   * Clicks the login button.
   */
  async clickOnLogin(): Promise<void> {
    await this.clickOnElement(
      this.loginButton,
      'Prijavi se button'
    );
  }

  /**
   * Opens the "Forgot Password" page in a new tab.
   */
  async openForgotPassword(): Promise<void> {
    await this.clickOnElement(
      this.forgotPasswordLink,
      'Zaboravljena lozinka'
    );
  }

  /**
   * Checks whether the login form is currently visible.
   * @returns True if the login form is visible, otherwise false.
   */
  async isLoginFormVisible(): Promise<boolean> {
    return this.usernameInput.isVisible().catch(() => false);
  }

  /**
   * Returns the text of all available provider options.
   * @returns A list of provider names displayed in the dropdown.
   */
  async getProviderOptions(): Promise<string[]> {
    return this.providerDropdown
      .locator('option')
      .allTextContents();
  }

  /**
   * Returns the current type attribute of the password input.
   * @returns The input type, for example "password" or "text".
   */
  async getPasswordInputType(): Promise<string | null> {
    return this.passwordInput.getAttribute('type');
  }

  /**
   * Toggles the password visibility.
   */
  async togglePasswordVisibility(): Promise<void> {
    await this.clickOnElement(
      this.passwordVisibilityButton,
      'Password visibility button'
    );
  }

  /**
   * Selects a provider from the provider dropdown.
   * @param provider - Provider to select.
   */
  async selectProvider(provider: string): Promise<void> {
    await this.selectOption(
      this.providerDropdown,
      provider,
      'Provider dropdown'
    );
  }

  /**
   * Logs in using the selected provider, username and password.
   * @param provider - Provider to select.
   * @param username - Username to use for login.
   * @param password - Password to use for login.
   */
  async login(username: string, password: string, provider: string = 'Telekom Srbija'): Promise<void> {
    await this.selectProvider(provider);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickOnLogin();
  }
}