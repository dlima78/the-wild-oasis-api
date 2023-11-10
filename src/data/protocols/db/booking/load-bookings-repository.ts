import { type BookingModel } from '@/domain/models'

export interface LoadBookingsRepository {
  loadAll: () => Promise<LoadBookingsRepository.Result>
}

export namespace LoadBookingsRepository {
  export type Result = BookingModel[]
}
