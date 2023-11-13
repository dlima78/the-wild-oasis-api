import { type DeleteBooking } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class DeleteBookingController implements Controller {
  constructor (private readonly deleteBooking: DeleteBooking) {}

  async handle (request: DeleteBookingController.Request): Promise<HttpResponse> {
    await this.deleteBooking.delete(request.bookingId)
    return {
      statusCode: 0,
      body: ''
    }
  }
}

export namespace DeleteBookingController {
  export type Request = {
    bookingId: string
  }
}
