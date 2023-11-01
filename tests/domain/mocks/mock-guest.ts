import { faker } from '@faker-js/faker'
import { type AddGuest } from '../usecases'

export const mockAddGuestParams = (): AddGuest.Params => ({
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  nationality: faker.location.country(),
  countryFlag: faker.lorem.word(3),
  nationalId: faker.location.countryCode()
})
