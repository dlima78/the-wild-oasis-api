import { type Decrypter } from '@/data/protocols'
import { type LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByTokenRepository {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async loadByToken (
    accessToken: string,
    role?: string | undefined
  ): Promise<LoadAccountByTokenRepository.Result> {
    const token = await this.decrypter.decrypt(accessToken)
    if (!token) {
      return null
    }
    const account = await this.loadAccountByTokenRepository.loadByToken(
      accessToken,
      role
    )
    if (!account) {
      return null
    }
    return {
      id: ''
    }
  }
}
