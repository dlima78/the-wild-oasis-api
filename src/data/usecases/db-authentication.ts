import { type Authentication } from '@/domain/usecases'
import {
  type UpdateAccessTokenRepository,
  type Encrypter,
  type LoadAccoutByEmailRepository,
  type HashComparer
} from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccoutByEmailRepository,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result> {
    const { email } = authenticationParams
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)
    if (account) {
      const isValid = await this.hashComparer.compare(
        authenticationParams.password,
        account.password
      )
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        )
        return {
          accessToken,
          name: account.name
        }
      }
    }
    return null
  }
}
