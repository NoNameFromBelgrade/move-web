import { Locator, Page, test } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Clicks on the specified element and tracks the action as a test step.
   * @param locator - Locator of the element to click.
   * @param elementName - Descriptive name of the element used in the test report.
   */
  protected async clickOnElement(
    locator: Locator,
    elementName: string
  ): Promise<void> {
    await test.step(`Click on element: ${elementName}`, async () => {
      await locator.click();
    });
  }

  /**
   * Fills the specified element with the provided text and tracks the action as a test step.
   * @param locator - Locator of the element to fill.
   * @param text - Text to enter into the element.
   * @param elementName - Descriptive name of the element used in the test report.
   */
  protected async fillElement(
    locator: Locator,
    text: string,
    elementName: string
  ): Promise<void> {
    await test.step(`Fill element: ${elementName}`, async () => {
      await locator.fill(text);
    });
  }

  /**
   * Checks the specified checkbox or radio button and tracks the action as a test step.
   * @param locator - Locator of the checkbox or radio button to check.
   * @param elementName - Descriptive name of the checkbox used in the test report.
   */
  protected async checkElement(
    locator: Locator,
    elementName: string
  ): Promise<void> {
    await test.step(`Check element: ${elementName}`, async () => {
      await locator.check();
    });
  }

  /**
   * Selects an option from a native select element and tracks the action as a test step.
   * @param locator - Locator of the select element.
   * @param option - Value or label of the option to select.
   * @param elementName - Descriptive name of the select element used in the test report.
   */
  protected async selectOption(
    locator: Locator,
    option: string,
    elementName: string
  ): Promise<void> {
    await test.step(`Select option "${option}" from: ${elementName}`, async () => {
      await locator.selectOption(option);
    });
  }
}