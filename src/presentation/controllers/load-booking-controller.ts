import { type LoadBooking } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class LoadBookingController implements Controller {
  constructor (private readonly loadBooking: LoadBooking) {}

  async handle (request: LoadBookingController.Request): Promise<HttpResponse> {
    await this.loadBooking.loadById(request.bookingId)
    return {
      statusCode: 0,
      body: ''
    }
  }
}

export namespace LoadBookingController {
  export type Request = {
    bookingId: string
  }
}
