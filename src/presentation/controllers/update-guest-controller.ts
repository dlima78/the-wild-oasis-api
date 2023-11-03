import { type UpdateGuest } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'

export class UpdateGuestController implements Controller {
  constructor (private readonly updateGuest: UpdateGuest) {}

  async handle (request: UpdateGuestController.Request): Promise<HttpResponse> {
    try {
      const guestResult = await this.updateGuest.update(request)
      return ok(guestResult)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace UpdateGuestController {
  export type Request = {
    guestId: string
    fullName: string
    email: string
    nationality: string
    countryFlag: string
    nationalId: string
  }
}
