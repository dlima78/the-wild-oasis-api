import { type Validation } from '@/presentation/protocols'

export class LoginController {
  constructor (private readonly validation: Validation) {}
  async handle (request: LoginController.Request): Promise<any> {
    this.validation.validate(request)
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
