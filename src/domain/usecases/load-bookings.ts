import { type BookingModel } from '@/domain/models'

export interface LoadBookings {
  load: () => Promise<LoadBookings.Result>
}

export namespace LoadBookings {
  export type Result = BookingModel[]
}
