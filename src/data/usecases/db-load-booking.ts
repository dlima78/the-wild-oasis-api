import { type LoadBookingByIdRepository } from '@/data/protocols'
import { type LoadBooking } from '@/domain/usecases'

export class DbLoadBooking implements LoadBooking {
  constructor (
    private readonly loadBookingByIdRepository: LoadBookingByIdRepository
  ) {}

  async loadById (id: string): Promise<LoadBooking.Result> {
    return await this.loadBookingByIdRepository.loadById(id)
  }
}
