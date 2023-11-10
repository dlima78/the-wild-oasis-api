import { LoadBookingsController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbLoadBookings } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeLoadBookingsController = (): Controller => {
  const controller = new LoadBookingsController(
    makeDbLoadBookings()
  )
  return makeLogControllerDecorator(controller)
}
