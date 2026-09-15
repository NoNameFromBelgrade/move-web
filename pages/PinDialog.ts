import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PinDialog extends BasePage {
    async enterPin(
    firstNumber: string,
    secondNumber: string,
    thirdNumber: string,
    fourthNumber: string
    ): Promise<void> {
        const pinNumbers = [
            firstNumber,
            secondNumber,
            thirdNumber,
            fourthNumber,
        ];

        for (const number of pinNumbers) {
            await this.clickOnElement(
                this.page.getByRole('button', {
                    name: number,
                    exact: true,
                }),
                `PIN number: ${number}`
            );
        }
    }
}