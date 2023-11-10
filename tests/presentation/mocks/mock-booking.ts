import { type LoadBooking, type AddBooking, type LoadBookings } from '@/domain/usecases'
import { mockBookingModel, mockBookingsModel } from '@/tests/domain/mocks'

export class AddBookingSpy implements AddBooking {
  params!: AddBooking.Params

  result = true

  async add (params: AddBooking.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}

export class LoadBookingSpy implements LoadBooking {
  result: LoadBooking.Result = mockBookingModel()
  bookingId = ''
  async loadById (bookingId: string): Promise<LoadBooking.Result> {
    this.bookingId = bookingId
    return this.result
  }
}

export class LoadBookingsSpy implements LoadBookings {
  result = mockBookingsModel()
  async load (): Promise<LoadBookings.Result> {
    return this.result
  }
}
