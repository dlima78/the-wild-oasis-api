import {
  type LoadAccountByToken,
  type AddAccount,
  type Authentication
} from '@/domain/usecases'
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
  params!: Authentication.Params
  result: null | Authentication.Result = {
    accessToken: faker.string.uuid(),
    name: faker.person.firstName()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: string | undefined
  role: string | undefined
  result = {
    id: faker.string.uuid()
  }

  async load (
    accessToken: string,
    role?: string | undefined
  ): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}
