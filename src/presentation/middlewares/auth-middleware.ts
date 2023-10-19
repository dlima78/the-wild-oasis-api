import { type LoadAccountByToken } from '@/domain/usecases'
import { type Controller } from '@/presentation/protocols'

export class AuthMiddleware implements Controller {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role: string | undefined
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<any> {
    const token = request.accessToken as string
    await this.loadAccountByToken.load(token)
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
