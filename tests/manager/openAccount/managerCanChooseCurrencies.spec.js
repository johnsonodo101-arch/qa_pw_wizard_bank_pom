import { test, expect} from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();
  await openAccountPage.selectCurrency('Dollar');
  await expect(page.locator('#currency')).toHaveValue('Dollar');
  await openAccountPage.selectCurrency('Pound');
  await expect(page.locator('#currency')).toHaveValue('Pound');
  await openAccountPage.selectCurrency('Rupee');
  await expect(page.locator('#currency')).toHaveValue('Rupee');
});
