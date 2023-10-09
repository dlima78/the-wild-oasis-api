import { type AddAccountRepository } from '@/data/protocols'

export class AddAccountRepositorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params | undefined
  result = true
  async add (params: AddAccountRepository.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}
