import { DbDeleteGuest } from '@/data/usecases'
import { GuestMongoRepository } from '@/infra/db'
import { type DeleteGuest } from '@/domain/usecases'

export const makeDbDeleteGuest = (): DeleteGuest => {
  const guestMongoRepository = new GuestMongoRepository()
  return new DbDeleteGuest(guestMongoRepository)
}
