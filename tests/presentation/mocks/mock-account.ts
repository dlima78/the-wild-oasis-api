import { type AddAccount, type Authentication } from '@/domain/usecases'

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
  result!: Authentication.Result | null

  async auth (
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result> {
    this.params = authenticationParams
    return this.result
  }
}
