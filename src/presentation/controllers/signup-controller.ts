import { type AddAccount } from '@/domain/usecases'
import {
  type Validation,
  type Controller,
  type HttpResponse
} from '@/presentation/protocols'

export class SignupController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (request: SignupController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    await this.addAccount.add({ ...request })
    return {
      statusCode: 400,
      body: null
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
