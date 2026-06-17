import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }


  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
  async selectCustomer(customerName) {
    await this.customerSelect.selectOption({ label: customerName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption({ label: currency });
  }
  async assertSelectedCurrencyEquals(expectedCurrency) {
    await expect(this.currencySelect).hasValue(expectedCurrency);
}

  async clickProcess() {
    await this.processButton.click();
  }

  async verifyAccountCreated() {
    const alert = await this.page.waitForEvent('dialog');
    expect(alert.message()).toContain('Account created successfully');
    await alert.accept();
  } 
}
