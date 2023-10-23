import { DbLoadCabins } from '@/data/usecases'
import { CabinMongoRepository } from '@/infra/db'
import { type LoadCabins } from '@/domain/usecases'

export const makeDbLoadCabins = (): LoadCabins => {
  const cabinMongoRepository = new CabinMongoRepository()
  return new DbLoadCabins(cabinMongoRepository)
}
