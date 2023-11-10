import { type LoadBookings } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class LoadBookingsController implements Controller {
  constructor (private readonly loadBookings: LoadBookings) {}

  async handle (): Promise<HttpResponse> {
    await this.loadBookings.load()
    return {
      statusCode: 0,
      body: ''
    }
  }
}
