import { DbLoadBooking } from '@/data/usecases'
import { BookingMongoRepository } from '@/infra/db'
import { type LoadBooking } from '@/domain/usecases'

export const makeDbLoadBooking = (): LoadBooking => {
  const bookingMongoRepository = new BookingMongoRepository()
  return new DbLoadBooking(bookingMongoRepository)
}
