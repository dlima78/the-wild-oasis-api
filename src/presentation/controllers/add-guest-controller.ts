import {
  type HttpResponse,
  type Controller,
  type Validation
} from '@/presentation/protocols'

export class AddGuestController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: AddGuestController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return {
      statusCode: 0,
      body: ''
    }
  }
}

export namespace AddGuestController {
  export type Request = {
    fullName: string
    email: string
    nationality: string
    countryFlag: string
    nationalId: string
  }
}
