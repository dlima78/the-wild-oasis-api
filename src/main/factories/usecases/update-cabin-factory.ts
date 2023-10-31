import { DbUpdateCabin } from '@/data/usecases'
import { CabinMongoRepository } from '@/infra/db'
import { type UpdateCabin } from '@/domain/usecases'

export const makeDbUpdateCabin = (): UpdateCabin => {
  const cabinMongoRepository = new CabinMongoRepository()
  return new DbUpdateCabin(cabinMongoRepository)
}
