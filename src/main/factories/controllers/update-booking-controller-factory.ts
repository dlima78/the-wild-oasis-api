import { UpdateBookingController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbUpdateBooking } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeUpdateBookingController = (): Controller => {
  const controller = new UpdateBookingController(
    makeDbUpdateBooking()
  )
  return makeLogControllerDecorator(controller)
}
