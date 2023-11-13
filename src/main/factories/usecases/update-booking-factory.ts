import { DbUpdateBooking } from '@/data/usecases'
import { BookingMongoRepository } from '@/infra/db'
import { type UpdateBooking } from '@/domain/usecases'

export const makeDbUpdateBooking = (): UpdateBooking => {
  const bookingMongoRepository = new BookingMongoRepository()
  return new DbUpdateBooking(bookingMongoRepository)
}
