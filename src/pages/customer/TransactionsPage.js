import { expect } from '@playwright/test';

export class TransactionsPage {
  constructor(page) {
    this.page = page;
this.tableHeader = page.locator('table thead tr').first();
    this.headerFirstCell = this.tableHeader.locator('td, th').nth(0);
    this.headerSecondCell = this.tableHeader.locator('td, th').nth(1);
    this.headerThirdCell = this.tableHeader.locator('td, th').nth(2);
    this.tableRows = page.locator('table tbody tr');
    this.firstRow = this.tableRows.first();
    this.firstRowAmountCell = this.firstRow.locator('td').nth(1);
    this.firstRowTypeCell = this.firstRow.locator('td').nth(2);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/listTx');
  }
  async reload() {
    await this.page.reload();
  }

  async assertFirstRowAmountContainsText(amount) {
    await this.firstRowAmountCell.waitFor({ state: 'visible' });
    await expect(this.firstRowAmountCell).toContainText(amount);
  }

  async assertFirstRowTypeContainsText(type) {
    await expect(this.firstRowTypeCell).toContainText(type);
  }

  async assertFirstRowIsHidden() {
    await expect(this.firstRow).toBeHidden();
  }

  async assertHeaderIsVisible() {
    await expect(this.tableHeader).toBeVisible();
  }

  async assertHeaderFirstCellContainsText(text) {
    await expect(this.headerFirstCell).toContainText(text);
  }

  async assertHeaderSecondCellContainsText(text) {
    await expect(this.headerSecondCell).toContainText(text);
  }

  async assertHeaderThirdCellContainsText(text) {
    await expect(this.headerThirdCell).toContainText(text);
  }
}