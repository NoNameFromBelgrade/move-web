//import { test, expect } from '@playwright/test';
import { test, expect } from '../../fixtures/session';

test.describe('Authenticated user', () => {

  test('User is logged in', async ({ sessionPage }) => {
    await sessionPage.goto('https://api2.mts-si.tv/web/dev/index.html#live');

    await expect(sessionPage.getByText("Ognjen Filipovic")).toBeVisible();
  });

  test('tEST', async ({ sessionPage }) => {
    await sessionPage.goto('https://api2.mts-si.tv/web/dev/index.html#live');

    await expect(sessionPage.getByText("Ognjen Filipovic")).toBeVisible();
  });
});