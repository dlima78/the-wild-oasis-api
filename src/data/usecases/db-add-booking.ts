import { type AddBookingRepository } from '@/data/protocols'
import { type AddBooking } from '@/domain/usecases'

export class DbAddBooking implements AddBooking {
  constructor (private readonly addBookingRepository: AddBookingRepository) {}

  async add (data: AddBooking.Params): Promise<boolean> {
    await this.addBookingRepository.add(data)
    return false
  }
}
