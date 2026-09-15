import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  private readonly searchField: Locator;
  private readonly duneMovie: Locator;
  private readonly superstarChannel: Locator;
  private readonly currentlyOnTvFirstChannel: Locator;
  private readonly missedOnTvFirstChannel: Locator;
  private readonly addReminderFirstChannel: Locator;
  private readonly radioSDanceChannel: Locator;
  private readonly erosMovie: Locator;
  private readonly actorsFirstActor: Locator;
  private readonly dexterSeries: Locator;

  constructor(page: Page) {
    super(page);

    this.searchField = page.getByLabel('Pretraga sadržaja');
    this.duneMovie = page.getByLabel('Dina');
    this.superstarChannel = page.getByLabel('Superstar TV');
    this.currentlyOnTvFirstChannel = page.locator("//div[h2[text()='TRENUTNO NA TV-U' or text()='CURRENTLY ON TV']]/following-sibling::div/div/div/div[1]");
    this.missedOnTvFirstChannel = page.locator("//div[h2[text()='PROPUŠTENO NA TV-U' or text()='MISSED ON TV']]/following-sibling::div/div/div/div[1]");
    this.addReminderFirstChannel = page.locator("//div[h2[text()='DODAJ U PODSETNIK' or text()='ADD REMINDER']]/following-sibling::div/div/div/div[1]");
    this.radioSDanceChannel = page.getByLabel('Radio S Dance');
    this.erosMovie = page.getByLabel('Eros');
    this.actorsFirstActor = page.locator("//div[h2[text()='GLUMCI' or text()='ACTORS']]/following-sibling::div/div/div/div[1]");
    this.dexterSeries = page.getByLabel('Dekster');
  }

  async fillSearchField(searchText: string): Promise<void> {
    await this.fillElement(
      this.searchField,
      searchText,
      'Search field'
    );
  }

  async clickOnDuneVideoClubMovie(): Promise<void> {
    await this.clickOnElement(
      this.duneMovie,
      'Dune movie in Video club'
    );
  }

  async clickOnSuperstarTvChannel(): Promise<void> {
    await this.clickOnElement(
      this.superstarChannel,
      'Superstar TV channel'
    );
  }

  async clickOnFirstCurrentlyOnTvChannel(): Promise<void> {
    await this.clickOnElement(
      this.currentlyOnTvFirstChannel,
      'First channel in currently on TV'
    );
  }

  async clickOnFirstMissedOnTvChannel(): Promise<void> {
    await this.clickOnElement(
      this.missedOnTvFirstChannel,
      'First channel in missed on TV'
    );
  }

  async clickOnFirstAddReminderChannel(): Promise<void> {
    await this.clickOnElement(
      this.addReminderFirstChannel,
      'First channel in add reminder'
    );
  }

  async clickOnRadioSDanceChannel(): Promise<void> {
    await this.clickOnElement(
      this.radioSDanceChannel,
      'S Dance radio channel'
    );
  }

  async clickOnErosVideoClubMovies(): Promise<void> {
    await this.clickOnElement(
      this.erosMovie,
      'Eros movie in Video club - movies'
    );
  }

  async clickOnFirstActor(): Promise<void> {
    await this.clickOnElement(
      this.actorsFirstActor,
      'First actor in actors'
    );
  }

  async clickOnDexterVideoClubSeries(): Promise<void> {
    await this.clickOnElement(
      this.dexterSeries,
      'Dexter series in Video club - series'
    );
  }
}