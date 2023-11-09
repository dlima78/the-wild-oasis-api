import { type BookingModel } from '@/domain/models'

export interface LoadBookingByIdRepository {
  loadById: (id: string) => Promise<LoadBookingRepository.Result>
}

export namespace LoadBookingRepository {
  export type Result = BookingModel
}
