import { BasePage } from '../BasePage';

export class PinDialog extends BasePage {
    async enterPin(pin: string): Promise<void> {
        for (const number of pin) {
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