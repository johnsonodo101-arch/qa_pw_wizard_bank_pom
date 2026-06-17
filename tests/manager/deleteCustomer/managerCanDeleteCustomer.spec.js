import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Manager can delete customer', () => {
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
    await addCustomerPage.setupAlertHandler();
    await addCustomerPage.clickAddCustomerFormButton();
    await page.locator('button[ng-click="showCust()"]').click();
  });

  test('Assert manager can delete customer', async ({ page }) => {
    const customersListPage = new CustomersListPage(page);
    await customersListPage.fillSearchInputField(firstName);
    await customersListPage.assertTableRowsCount(1);
    await customersListPage.clickDeleteButton();
    await customersListPage.assertTableRowsCount(0);
  });
});