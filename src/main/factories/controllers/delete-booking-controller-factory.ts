import { DeleteBookingController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbDeleteBooking } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeDeleteBookingController = (): Controller => {
  const controller = new DeleteBookingController(
    makeDbDeleteBooking()
  )
  return makeLogControllerDecorator(controller)
}
