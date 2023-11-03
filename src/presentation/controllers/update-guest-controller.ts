import { type UpdateGuest } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { ok } from '../helpers'

export class UpdateGuestController implements Controller {
  constructor (private readonly updateGuest: UpdateGuest) {}

  async handle (request: UpdateGuestController.Request): Promise<HttpResponse> {
    const guestResult = await this.updateGuest.update(request)
    return ok(guestResult)
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
