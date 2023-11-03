import { type DeleteGuest } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { forbidden, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

export class DeleteGuestController implements Controller {
  constructor (private readonly deleteGuest: DeleteGuest) {}

  async handle (request: DeleteGuestController.Request): Promise<HttpResponse> {
    try {
      const isDeleted = await this.deleteGuest.delete(request.guestId)
      if (!isDeleted) {
        return forbidden(new InvalidParamError('guestId'))
      }
      return {
        statusCode: 0,
        body: ''
      }
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace DeleteGuestController {
  export type Request = {
    guestId: string
  }
}
