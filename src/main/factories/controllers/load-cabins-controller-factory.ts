import { LoadCabinsController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbLoadCabins } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeLoadCabinsController = (): Controller => {
  const controller = new LoadCabinsController(makeDbLoadCabins())
  return makeLogControllerDecorator(controller)
}
