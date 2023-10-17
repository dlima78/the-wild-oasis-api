import { type Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'

export class LoginController {
  constructor (private readonly validation: Validation) {}
  async handle (request: LoginController.Request): Promise<any> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
