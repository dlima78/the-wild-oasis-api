import { type LoadBooking } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'

export class LoadBookingController implements Controller {
  constructor (private readonly loadBooking: LoadBooking) {}

  async handle (request: LoadBookingController.Request): Promise<HttpResponse> {
    try {
      const bookingModel = await this.loadBooking.loadById(request.bookingId)
      return ok(bookingModel)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace LoadBookingController {
  export type Request = {
    bookingId: string
  }
}
