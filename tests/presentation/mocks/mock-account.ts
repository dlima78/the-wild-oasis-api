import { type AddAccount, type Authentication } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params | undefined
  result = true
  async add (params: AddAccount.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params | undefined
  result: null | Authentication.Result = {
    accessToken: faker.string.uuid(),
    name: faker.person.firstName()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}
