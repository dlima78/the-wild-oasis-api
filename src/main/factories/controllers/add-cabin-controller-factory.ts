import { AddCabinController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeAddCabinValidation, makeDbAddCabin } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeAddCabinController = (): Controller => {
  const controller = new AddCabinController(
    makeDbAddCabin(),
    makeAddCabinValidation()
  )
  return makeLogControllerDecorator(controller)
}
