import { DeleteGuestController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbDeleteGuest } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeDeleteGuestController = (): Controller => {
  const controller = new DeleteGuestController(makeDbDeleteGuest())
  return makeLogControllerDecorator(controller)
}
