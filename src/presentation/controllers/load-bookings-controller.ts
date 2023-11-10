import { type LoadBookings } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { ok } from '../helpers'

export class LoadBookingsController implements Controller {
  constructor (private readonly loadBookings: LoadBookings) {}

  async handle (): Promise<HttpResponse> {
    const bookings = await this.loadBookings.load()
    return ok(bookings)
  }
}
