import { DeleteCabinController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbDeleteCabin } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeDeleteCabinController = (): Controller => {
  const controller = new DeleteCabinController(makeDbDeleteCabin())
  return makeLogControllerDecorator(controller)
}
