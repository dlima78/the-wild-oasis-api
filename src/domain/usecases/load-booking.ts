import { type BookingModel } from '@/domain/models'

export interface LoadBooking {
  loadById: (bookingId: string) => Promise<LoadBooking.Result>
}

export namespace LoadBooking {
  export type Result = BookingModel
}
