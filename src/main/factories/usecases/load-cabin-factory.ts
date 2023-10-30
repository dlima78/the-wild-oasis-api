import { DbLoadCabin } from '@/data/usecases'
import { CabinMongoRepository } from '@/infra/db'
import { type LoadCabin } from '@/domain/usecases'

export const makeDbLoadCabin = (): LoadCabin => {
  const cabinMongoRepository = new CabinMongoRepository()
  return new DbLoadCabin(cabinMongoRepository)
}
