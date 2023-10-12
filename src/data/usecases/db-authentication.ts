import { type Authentication } from '@/domain/usecases'
import {
  type Encrypter,
  type LoadAccoutByEmailRepository
} from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccoutByEmailRepository,
    private readonly encrypter: Encrypter
  ) {}

  async auth (
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result> {
    const { email } = authenticationParams
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (account) {
      await this.encrypter.encrypt(account.id)
    }
    return null
  }
}
