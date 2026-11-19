import fs from 'node:fs';
import path from 'node:path';
import { test, expect } from '../fixtures/baseTest';
import data from '../testData/test-data.json';

const authFile = path.resolve(__dirname, '../playwright/.auth/user.json');

test('save authenticated session', async ({ page, loginPage }) => {
  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  await loginPage.open(data.baseUrl);
  await loginPage.login(data.users.valid.email, data.users.valid.password);
  await expect(loginPage.loggedInUser).toContainText(data.users.valid.username);
  await page.context().storageState({ path: authFile });
});
