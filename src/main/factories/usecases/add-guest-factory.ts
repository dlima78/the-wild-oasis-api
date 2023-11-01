import { DbAddGuest } from '@/data/usecases'
import { GuestMongoRepository } from '@/infra/db'
import { type AddGuest } from '@/domain/usecases'

export const makeDbAddGuest = (): AddGuest => {
  const guestMongoRepository = new GuestMongoRepository()
  return new DbAddGuest(guestMongoRepository)
}
