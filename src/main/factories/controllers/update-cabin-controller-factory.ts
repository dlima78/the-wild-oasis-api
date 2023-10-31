import { UpdateCabinController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbUpdateCabin } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeUpdateCabinController = (): Controller => {
  const controller = new UpdateCabinController(makeDbUpdateCabin())
  return makeLogControllerDecorator(controller)
}
