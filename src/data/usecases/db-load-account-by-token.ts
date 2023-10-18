import { type Decrypter } from '@/data/protocols'
import { type LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByTokenRepository {
  constructor (private readonly decrypter: Decrypter) {}
  async loadByToken (
    accessToken: string,
    role?: string | undefined
  ): Promise<LoadAccountByTokenRepository.Result> {
    const account = await this.decrypter.decrypt(accessToken)
    if (!account) {
      return null
    }
    return {
      id: ''
    }
  }
}
