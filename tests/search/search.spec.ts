import { test, expect } from '../../fixtures/session';
import { Urls } from '../../constants/Urls';

import { TopBar } from '../../pages/components/TopBar';
import { SearchPage } from '../../pages/SearchPage';
import { VideoClubPage } from '../../pages/VideoClubPage';
import { LiveTvPage } from '../../pages/LiveTvPage';
import { AddReminderPage } from '../../pages/AddReminderPage';

test.describe('Search', () => {

  test('User can open all search result options', async ({ sessionPage }) => {
    const topBar = new TopBar(sessionPage);
    const searchPage = new SearchPage(sessionPage);
    const videoClubPage = new VideoClubPage(sessionPage);
    const liveTvPage = new LiveTvPage(sessionPage);
    const addReminderPage = new AddReminderPage(sessionPage);

    await sessionPage.goto(Urls.mojTv);

    // Open search
    await topBar.clickOnSearch();

    // Dune - Video club
    await searchPage.clickOnDuneVideoClubMovie();
    await expect(sessionPage.getByRole('heading', { level: 1 })).toHaveText('Dina');
    await videoClubPage.clickOnBack();

    // Superstar TV - TV channels
    await searchPage.clickOnSuperstarTvChannel();
    await expect(sessionPage.locator('video')).toBeVisible();
    await liveTvPage.clickOnHideControls();
    await liveTvPage.clickOnBack();

    // First channel - Currently on TV
    await searchPage.clickOnFirstCurrentlyOnTvChannel();
    await expect(sessionPage.locator('video')).toBeVisible();
    await liveTvPage.clickOnHideControls();
    await liveTvPage.clickOnBack();

    // First channel - Missed on TV
    await searchPage.clickOnFirstMissedOnTvChannel();
    await expect(sessionPage.locator('video')).toBeVisible();
    await liveTvPage.clickOnHideControls();
    await liveTvPage.clickOnBack();

    // First channel - Add reminder
    await searchPage.clickOnFirstAddReminderChannel();
    await expect(sessionPage.getByText("Dodaj podsetnik")).toBeVisible();
    await addReminderPage.clickOnClose();

    // Radio S Dance
    await searchPage.clickOnRadioSDanceChannel();
    await expect(sessionPage.locator("//a[@aria-current='page' and text()='Radio']")).toBeVisible();
    await topBar.clickOnSearch();

    // Eros - Video club
    await searchPage.clickOnErosVideoClubMovies();
    await expect(sessionPage.getByRole('heading', { level: 1 })).toHaveText('Eros');
    await videoClubPage.clickOnBack();

    // First actor
    await searchPage.clickOnFirstActor();
    await expect(sessionPage.locator("//a[@aria-current='page' and (text()='Video club' or text()='Video klub')]")).toBeVisible();
    await videoClubPage.clickOnBack();

    // Dexter - Video club series
    await searchPage.clickOnDexterVideoClubSeries();
    await expect(sessionPage.getByRole('heading', { level:1 })).toHaveText('Dekster');
  });

  test('User can search for content', async ({ sessionPage }) => {
    const topBar = new TopBar(sessionPage);
    const searchPage = new SearchPage(sessionPage);

    await sessionPage.goto(Urls.mojTv);

    await topBar.clickOnSearch();
    await searchPage.fillSearchField('Babe');

    await expect(sessionPage.getByLabel('BEJB').nth(0)).toBeVisible();
  });
});