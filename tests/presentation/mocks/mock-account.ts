import { type AddAccount } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params | undefined
  result = true
  async add (params: AddAccount.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}
