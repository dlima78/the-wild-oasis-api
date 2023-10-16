import { DbAddCabin } from '@/data/usecases'
import { CabinMongoRepository } from '@/infra/db'
import { type AddCabin } from '@/domain/usecases'

export const makeDbAddCabin = (): AddCabin => {
  const cabinMongoRepository = new CabinMongoRepository()
  return new DbAddCabin(cabinMongoRepository)
}
