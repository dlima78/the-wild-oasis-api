import {
  type HttpResponse,
  type Controller,
  type Validation
} from '@/presentation/protocols'
import { badRequest, ok, unauthorized } from '@/presentation/helpers'
import { type Authentication } from '@/domain/usecases'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const authenticationModel = await this.authentication.auth(request)
    if (!authenticationModel) {
      return unauthorized()
    }
    return ok({
      accessToken: authenticationModel.accessToken,
      name: authenticationModel.name
    })
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
