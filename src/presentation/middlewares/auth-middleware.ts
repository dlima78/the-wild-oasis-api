import { type LoadAccountByToken } from '@/domain/usecases'
import { type Controller } from '@/presentation/protocols'
import { forbidden } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'

export class AuthMiddleware implements Controller {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role: string | undefined
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<any> {
    const token = request.accessToken
    if (token) {
      await this.loadAccountByToken.load(token)
    }

    return forbidden(new AccessDeniedError())
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
