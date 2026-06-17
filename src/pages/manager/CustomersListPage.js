import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInputField = this.page.getByPlaceholder('Search Customer');
    this.allTableRows = page.locator('table tbody tr');
    this.customersTableRows = page.locator('table tbody tr').last ();
    this.firstNameColumn = this.customersTableRows.locator('td').nth(0);
    this.lastNameColumn = this.customersTableRows.locator('td').nth(1);
    this.postalCodeColumn = this.customersTableRows.locator('td').nth(2);
    this.accountNumberColumn = this.customersTableRows.locator('td').nth(3); 
   this.deleteButton = this.page.locator('table tbody tr button');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async fillSearchInputField(text) {
  await this.searchInputField.fill(text);
 }
async assertTableRowsCount(expectedCount) {
  await expect(this.allTableRows).toHaveCount(expectedCount);
}
async assertLastRowFirstNameEquals(value) {
    await expect(this.firstNameColumn).toHaveText(value);
  }
  async assertLastRowLastNameEquals(value) {
    await expect(this.lastNameColumn).toHaveText(value);
  }
  async assertLastRowPostalCodeEquals(value) {
    await expect(this.postalCodeColumn).toHaveText(value);
  }
  async assertLastRowAccountNumberIsEmpty() {
    await expect(this.accountNumberColumn).toBeEmpty();
  }
  async clickDeleteButton() {
  await this.deleteButton.click();
}
  
}
