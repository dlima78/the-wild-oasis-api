import { LoadGuestController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbLoadGuest } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeLoadGuestController = (): Controller => {
  const controller = new LoadGuestController(makeDbLoadGuest())
  return makeLogControllerDecorator(controller)
}
