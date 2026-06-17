import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInputField = page.getByPlaceholder('First Name');
    this.lastNameInputField = page.getByPlaceholder('Last Name');
    this.postCodeInputField = page.getByPlaceholder('Post Code');
    this.addCustomerFormButton = page.locator('form button[type="submit"]');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstNameInputField(firstName) {
    await this.firstNameInputField.fill(firstName);
  }

  async fillLastNameInputField(lastName) {
    await this.lastNameInputField.fill(lastName);
  }

  async fillPostCodeInputField(postCode) {
    await this.postCodeInputField.fill(postCode);
  }

  async clickAddCustomerFormButton() {
    await this.addCustomerFormButton.click();
  }
  async setupAlertHandler() {
    this.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Customer added successfully with customer id');
      await dialog.accept();
    });
  }
}