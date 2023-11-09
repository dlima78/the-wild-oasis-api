import { type LoadBookingByIdRepository } from '@/data/protocols'
import { type LoadBooking } from '@/domain/usecases'
import { mockBookingModel } from '@/tests/domain/mocks'

export class DbLoadBooking implements LoadBooking {
  constructor (
    private readonly loadBookingByIdRepository: LoadBookingByIdRepository
  ) {}

  async loadById (id: string): Promise<LoadBooking.Result> {
    await this.loadBookingByIdRepository.loadById(id)
    return mockBookingModel()
  }
}
