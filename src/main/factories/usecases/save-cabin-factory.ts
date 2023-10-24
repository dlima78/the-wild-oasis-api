import { DbSaveCabin } from '@/data/usecases'
import { CabinMongoRepository } from '@/infra/db'
import { type SaveCabin } from '@/domain/usecases'

export const makeDbSaveCabin = (): SaveCabin => {
  const cabinMongoRepository = new CabinMongoRepository()
  return new DbSaveCabin(cabinMongoRepository)
}
