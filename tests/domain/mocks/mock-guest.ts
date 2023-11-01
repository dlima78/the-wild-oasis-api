import { faker } from '@faker-js/faker'
import { type AddGuest } from '../usecases'
import { type GuestModel } from '../models'

export const mockAddGuestParams = (): AddGuest.Params => ({
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  nationality: faker.location.country(),
  countryFlag: faker.lorem.word(3),
  nationalId: faker.location.countryCode()
})

export const mockGuestModel = (): GuestModel => ({
  id: faker.string.uuid(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  nationality: faker.location.country(),
  countryFlag: faker.lorem.word(3),
  nationalId: faker.location.countryCode()
})
