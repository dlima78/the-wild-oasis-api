import { type Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'
import { type Authentication } from '@/domain/usecases'

export class LoginController {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: LoginController.Request): Promise<any> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.authentication.auth(request)
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
