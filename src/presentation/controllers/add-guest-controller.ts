import {
  type HttpResponse,
  type Controller,
  type Validation
} from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { type AddGuest } from '@/domain/usecases'

export class AddGuestController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addGuest: AddGuest
  ) {}

  async handle (request: AddGuestController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.addGuest.add(request)
      return noContent()
    } catch (error) {
      return serverError(error as Error)
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
