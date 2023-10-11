import { type AddAccount } from '@/domain/usecases'
import {
  type Validation,
  type Controller,
  type HttpResponse
} from '@/presentation/protocols'
import { badRequest, serverError } from '@/presentation/helpers'
import { ServerError } from '../errors'
import { type Authentication } from '@/data/usecases'

export class SignupController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: SignupController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = request
      await this.addAccount.add({ name, email, password })
      await this.authentication.auth({
        email,
        password
      })
      return {
        statusCode: 400,
        body: null
      }
    } catch (error) {
      return serverError(new ServerError(error as string))
    }
  }
}

export namespace SignupController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
