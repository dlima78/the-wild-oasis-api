import { type LoadBookings } from '@/domain/usecases'
import { type LoadBookingsRepository } from '@/data/protocols'

export class DbLoadBookings implements LoadBookings {
  constructor (private readonly loadBookingsRepository: LoadBookingsRepository) {}
  async load (): Promise<LoadBookings.Result> {
    await this.loadBookingsRepository.loadAll()
    return []
  }
}
