import { type DeleteGuest } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class DeleteGuestController implements Controller {
  constructor (private readonly deleteGuest: DeleteGuest) {}

  async handle (request: DeleteGuestController.Request): Promise<HttpResponse> {
    await this.deleteGuest.delete(request.guestId)
    return {
      statusCode: 0,
      body: ''
    }
  }
}

export namespace DeleteGuestController {
  export type Request = {
    guestId: string
  }
}
