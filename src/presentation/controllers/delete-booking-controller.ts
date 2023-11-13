import { type DeleteBooking } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { forbidden, noContent } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

export class DeleteBookingController implements Controller {
  constructor (private readonly deleteBooking: DeleteBooking) {}

  async handle (request: DeleteBookingController.Request): Promise<HttpResponse> {
    const isDeleted = await this.deleteBooking.delete(request.bookingId)
    if (!isDeleted) {
      return forbidden(new InvalidParamError('bookingId'))
    }
    return noContent()
  }
}

export namespace DeleteBookingController {
  export type Request = {
    bookingId: string
  }
}
