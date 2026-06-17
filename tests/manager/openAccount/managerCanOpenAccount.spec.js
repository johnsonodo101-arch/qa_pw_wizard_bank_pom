import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Open account test', () => {
  let firstName;
  let lastName;
  let postalCode;
  
  test.beforeEach(async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);
    firstName = faker.person.firstName();
    lastName = faker.person.lastName();
    postalCode = faker.location.zipCode();
    await addCustomerPage.open();
    await addCustomerPage.fillFirstNameInputField(firstName);
    await addCustomerPage.fillLastNameInputField(lastName);
    await addCustomerPage.fillPostCodeInputField(postalCode);
    page.once('dialog', async dialog => await dialog.accept());
    await addCustomerPage.clickAddCustomerFormButton();
    await page.locator('button[ng-click="openAccount()"]').click();
  });

  test('Assert manager can open account', async ({ page }) => {
    const openAccountPage = new OpenAccountPage(page);
    const customersListPage = new CustomersListPage(page);
    await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
    await openAccountPage.selectCurrency('Dollar');
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Account created successfully');
      await dialog.accept();
    });
    await openAccountPage.clickProcess();
    await page.locator('button[ng-click="showCust()"]').click();
    const lastRowAccountNumber = page.locator('table tbody tr:last-child td').nth(3);
    await expect(lastRowAccountNumber).not.toBeEmpty();
  });
});