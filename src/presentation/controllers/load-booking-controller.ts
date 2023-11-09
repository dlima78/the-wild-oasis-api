import { type LoadBooking } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers'

export class LoadBookingController implements Controller {
  constructor (private readonly loadBooking: LoadBooking) {}

  async handle (request: LoadBookingController.Request): Promise<HttpResponse> {
    const bookingModel = await this.loadBooking.loadById(request.bookingId)
    return ok(bookingModel)
  }
}

export namespace LoadBookingController {
  export type Request = {
    bookingId: string
  }
}
