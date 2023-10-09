import { faker } from '@faker-js/faker'
import { type AddAccount } from '../usecases'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})
