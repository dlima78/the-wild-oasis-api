import { type BookingModel } from '@/domain/models'

export interface LoadBookingByIdRepository {
  loadById: (id: string) => Promise<LoadBookingByIdRepository.Result>
}

export namespace LoadBookingByIdRepository {
  export type Result = BookingModel
}
