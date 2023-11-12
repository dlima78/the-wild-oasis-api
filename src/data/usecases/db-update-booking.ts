import { type UpdateBooking } from '@/domain/usecases'
import { type UpdateBookingRepository } from '@/data/protocols'

export class DbUpdateBooking implements UpdateBooking {
  constructor (private readonly updateBookingRepository: UpdateBookingRepository) {}
  async update (data: UpdateBooking.Params): Promise<UpdateBooking.Result> {
    return await this.updateBookingRepository.update(data)
  }
}
