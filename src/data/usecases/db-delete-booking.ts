import { type DeleteBooking } from '@/domain/usecases'
import { type DeleteBookingRepository } from '@/data/protocols'

export class DbDeleteBooking implements DeleteBooking {
  constructor (private readonly deleteBookingRepository: DeleteBookingRepository) {}
  async delete (bookingId: string): Promise<boolean> {
    const isValid = await this.deleteBookingRepository.delete(bookingId)
    if (!isValid) {
      return false
    }
    return true
  }
}
