import { type Decrypter } from '@/data/protocols'
import { type LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByTokenRepository {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async loadByToken (
    token: string,
    role?: string | undefined
  ): Promise<LoadAccountByTokenRepository.Result> {
    const account = await this.decrypter.decrypt(token)
    if (!account) {
      return null
    }
    await this.loadAccountByTokenRepository.loadByToken(token, role)
    return {
      id: ''
    }
  }
}
