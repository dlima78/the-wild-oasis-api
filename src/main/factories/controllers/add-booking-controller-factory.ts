import { AddBookingController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeAddBookingValidation, makeDbAddBooking } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeAddBookingController = (): Controller => {
  const controller = new AddBookingController(
    makeAddBookingValidation(),
    makeDbAddBooking()
  )
  return makeLogControllerDecorator(controller)
}
