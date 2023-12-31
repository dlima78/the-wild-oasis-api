import { type LoadBookings } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helpers'

export class LoadBookingsController implements Controller {
  constructor (private readonly loadBookings: LoadBookings) {}

  async handle (): Promise<HttpResponse> {
    try {
      const bookings = await this.loadBookings.load()
      if (bookings.length === 0) {
        return noContent()
      }
      return ok(bookings)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
