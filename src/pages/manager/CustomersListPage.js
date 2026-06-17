import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInputField = this.page.getByPlaceholder('Search Customer');
    this.allTableRows = this.page.locator('table tbody tr');
    this.customerTableRow = this.allTableRows.last();
    this.firstNameColumn = this.customerTableRow.locator('td').nth(0);
    this.lastNameColumn = this.customerTableRow.locator('td').nth(1);
    this.postalCodeColumn = this.customerTableRow.locator('td').nth(2);
    this.accountNumberColumn = this.customerTableRow.locator('td').nth(3);
    this.deleteButton = this.customerTableRow.locator('button');
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