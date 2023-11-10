import { DbLoadBookings } from '@/data/usecases'
import { BookingMongoRepository } from '@/infra/db'
import { type LoadBookings } from '@/domain/usecases'

export const makeDbLoadBookings = (): LoadBookings => {
  const bookingMongoRepository = new BookingMongoRepository()
  return new DbLoadBookings(bookingMongoRepository)
}
