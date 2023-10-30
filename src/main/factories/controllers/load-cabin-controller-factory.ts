import { LoadCabinController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbLoadCabin } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeLoadCabinController = (): Controller => {
  const controller = new LoadCabinController(makeDbLoadCabin())
  return makeLogControllerDecorator(controller)
}
