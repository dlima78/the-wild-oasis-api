import { type Decrypter } from '@/data/protocols'
import { type LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByTokenRepository {
  constructor (private readonly decrypter: Decrypter) {}
  async loadByToken (
    accessToken: string,
    role?: string | undefined
  ): Promise<LoadAccountByTokenRepository.Result> {
    await this.decrypter.decrypt(accessToken)
    return { id: '' }
  }
}
