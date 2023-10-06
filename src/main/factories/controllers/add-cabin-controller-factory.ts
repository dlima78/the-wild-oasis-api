import { AddCabinController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { DbAddCabin } from '@/data/usecases'
import { CabinMongoRepository } from '@/infra/db'
import { makeAddCabinValidation } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeAddCabinController = (): Controller => {
  const cabinMongoRepository = new CabinMongoRepository()
  const dbAddCabin = new DbAddCabin(cabinMongoRepository)
  const controller = new AddCabinController(
    dbAddCabin,
    makeAddCabinValidation()
  )
  return makeLogControllerDecorator(controller)
}
