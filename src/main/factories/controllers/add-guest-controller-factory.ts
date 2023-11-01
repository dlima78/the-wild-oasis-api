import { AddGuestController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeAddGuestValidation, makeDbAddGuest } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeAddGuestController = (): Controller => {
  const controller = new AddGuestController(
    makeAddGuestValidation(),
    makeDbAddGuest()
  )
  return makeLogControllerDecorator(controller)
}
