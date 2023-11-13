import { DbDeleteBooking } from '@/data/usecases'
import { BookingMongoRepository } from '@/infra/db'
import { type DeleteBooking } from '@/domain/usecases'

export const makeDbDeleteBooking = (): DeleteBooking => {
  const bookingMongoRepository = new BookingMongoRepository()
  return new DbDeleteBooking(bookingMongoRepository)
}
