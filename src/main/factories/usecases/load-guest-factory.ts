import { DbLoadGuest } from '@/data/usecases'
import { GuestMongoRepository } from '@/infra/db'
import { type LoadGuest } from '@/domain/usecases'

export const makeDbLoadGuest = (): LoadGuest => {
  const guestMongoRepository = new GuestMongoRepository()
  return new DbLoadGuest(guestMongoRepository)
}
