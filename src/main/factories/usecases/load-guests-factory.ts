import { DbLoadGuests } from '@/data/usecases'
import { GuestMongoRepository } from '@/infra/db'
import { type LoadGuests } from '@/domain/usecases'

export const makeDbLoadGuests = (): LoadGuests => {
  const guestMongoRepository = new GuestMongoRepository()
  return new DbLoadGuests(guestMongoRepository)
}
