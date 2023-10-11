import { type Authentication } from '@/domain/usecases'
import { type LoadAccoutByEmailRepository } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccoutByEmailRepository
  ) {}

  async auth (
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result> {
    const { email } = authenticationParams
    await this.loadAccountByEmailRepository.loadByEmail(email)
    return {
      accessToken: '',
      name: ''
    }
  }
}
