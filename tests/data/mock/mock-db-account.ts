import {
  type CheckAccountByEmailRepository,
  type AddAccountRepository,
  type UpdateAccessTokenRepository,
  type LoadAccoutByEmailRepository,
  type LoadAccountByTokenRepository
} from '@/data/protocols'

import { faker } from '@faker-js/faker'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params | undefined
  result = true
  async add (params: AddAccountRepository.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}

export class CheckAccountByEmailRepositorySpy
implements CheckAccountByEmailRepository {
  email = ''
  result = false

  async checkByEmail (
    email: string
  ): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class LoadAccoutByEmailRepositorySpy
implements LoadAccoutByEmailRepository {
  email: string | undefined
  result: LoadAccoutByEmailRepository.Result = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    password: faker.internet.password()
  }

  async loadByEmail (
    email: string
  ): Promise<LoadAccoutByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy
implements UpdateAccessTokenRepository {
  id = ''
  token = ''
  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}

export class LoadAccountByTokenRepositorySpy
implements LoadAccountByTokenRepository {
  token!: string
  role?: string
  result: LoadAccountByTokenRepository.Result = {
    id: faker.string.uuid()
  }

  async loadByToken (
    token: string,
    role?: string | undefined
  ): Promise<LoadAccountByTokenRepository.Result> {
    this.token = token
    this.role = role
    return this.result
  }
}
