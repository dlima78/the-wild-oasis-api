import { type LoadAccountByToken } from '@/domain/usecases'
import { type Controller } from '@/presentation/protocols'
import { forbidden, ok } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'

export class AuthMiddleware implements Controller {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role: string | undefined
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<any> {
    const token = request.accessToken
    if (token) {
      const account = await this.loadAccountByToken.load(token)
      if (account) {
        return ok({
          accountId: account.id
        })
      }
    }

    return forbidden(new AccessDeniedError())
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
