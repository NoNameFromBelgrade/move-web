import { faker } from '@faker-js/faker';

export function generateProfileName(): string {
  return `Test ${faker.word.noun()} ${faker.number.int({
    min: 1000,
    max: 9999,
  })}`;
}