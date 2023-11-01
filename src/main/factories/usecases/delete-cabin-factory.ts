import { DbDeleteCabin } from '@/data/usecases'
import { CabinMongoRepository } from '@/infra/db'
import { type DeleteCabin } from '@/domain/usecases'

export const makeDbDeleteCabin = (): DeleteCabin => {
  const cabinMongoRepository = new CabinMongoRepository()
  return new DbDeleteCabin(cabinMongoRepository)
}
