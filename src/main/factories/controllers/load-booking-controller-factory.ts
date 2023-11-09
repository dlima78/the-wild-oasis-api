import { LoadBookingController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbLoadBooking } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeLoadBookingController = (): Controller => {
  const controller = new LoadBookingController(
    makeDbLoadBooking()
  )
  return makeLogControllerDecorator(controller)
}
