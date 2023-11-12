import { type UpdateBooking } from '@/domain/usecases'
import { type UpdateBookingRepository } from '@/data/protocols'
import { mockBookingModel } from '@/tests/domain/mocks'

export class DbUpdateBooking implements UpdateBooking {
  constructor (private readonly updateBookingRepository: UpdateBookingRepository) {}
  async update (data: UpdateBooking.Params): Promise<UpdateBooking.Result> {
    await this.updateBookingRepository.update(data)
    return mockBookingModel()
  }
}
