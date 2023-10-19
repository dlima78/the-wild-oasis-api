import { type LoadAccountByToken } from '@/domain/usecases'
import { type Controller } from '@/presentation/protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'

export class AuthMiddleware implements Controller {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role: string | undefined
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<any> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const account = await this.loadAccountByToken.load(
          accessToken,
          this.role
        )
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
