import { UpdateGuestController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbUpdateGuest } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeUpdateGuestController = (): Controller => {
  const controller = new UpdateGuestController(makeDbUpdateGuest())
  return makeLogControllerDecorator(controller)
}
