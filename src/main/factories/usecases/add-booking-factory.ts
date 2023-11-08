import { DbAddBooking } from '@/data/usecases'
import { BookingMongoRepository } from '@/infra/db'
import { type AddBooking } from '@/domain/usecases'

export const makeDbAddBooking = (): AddBooking => {
  const bookingMongoRepository = new BookingMongoRepository()
  return new DbAddBooking(bookingMongoRepository)
}
