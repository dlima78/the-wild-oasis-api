import { type AddAccountRepository, type Hasher } from '@/data/protocols'
import { type AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccount.Params): Promise<boolean> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    })
    return true
  }
}
