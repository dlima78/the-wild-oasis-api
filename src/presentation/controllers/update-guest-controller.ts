import { type UpdateGuest } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class UpdateGuestController implements Controller {
  constructor (private readonly updateGuest: UpdateGuest) {}

  async handle (request: UpdateGuestController.Request): Promise<HttpResponse> {
    await this.updateGuest.update(request)
    return {
      statusCode: 0,
      body: ''
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
