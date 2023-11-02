import { LoadGuestsController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbLoadGuests } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeLoadGuestsController = (): Controller => {
  const controller = new LoadGuestsController(makeDbLoadGuests())
  return makeLogControllerDecorator(controller)
}
