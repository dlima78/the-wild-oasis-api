import { type AddAccount } from '@/domain/usecases'
import {
  type Validation,
  type Controller,
  type HttpResponse
} from '@/presentation/protocols'
import { badRequest, serverError } from '@/presentation/helpers'
import { ServerError } from '../errors'

export class SignupController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (request: SignupController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.addAccount.add({ ...request })
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
