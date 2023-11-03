import { DbUpdateGuest } from '@/data/usecases'
import { GuestMongoRepository } from '@/infra/db'
import { type UpdateGuest } from '@/domain/usecases'

export const makeDbUpdateGuest = (): UpdateGuest => {
  const guestMongoRepository = new GuestMongoRepository()
  return new DbUpdateGuest(guestMongoRepository)
}
