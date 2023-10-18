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
    let token: string | null
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }

    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(
        accessToken,
        role
      )
      if (account) {
        return {
          id: ''
        }
      }
    }
    return null
  }
}
