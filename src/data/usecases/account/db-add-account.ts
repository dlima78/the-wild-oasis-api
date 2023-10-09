import { type Hasher } from '@/data/protocols'
import { type AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher) {}
  async add (account: AddAccount.Params): Promise<boolean> {
    await this.hasher.hash(account.password)
    return true
  }
}
