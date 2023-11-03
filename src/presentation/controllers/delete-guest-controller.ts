import { type DeleteGuest } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { forbidden } from '../helpers'
import { InvalidParamError } from '../errors'

export class DeleteGuestController implements Controller {
  constructor (private readonly deleteGuest: DeleteGuest) {}

  async handle (request: DeleteGuestController.Request): Promise<HttpResponse> {
    const isDeleted = await this.deleteGuest.delete(request.guestId)
    if (!isDeleted) {
      return forbidden(new InvalidParamError('guestId'))
    }
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
