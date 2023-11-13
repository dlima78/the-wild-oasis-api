import { type UpdateBooking } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { ok } from '../helpers'

export class UpdateBookingController implements Controller {
  constructor (private readonly updateBooking: UpdateBooking) {}

  async handle (request: UpdateBookingController.Request): Promise<HttpResponse> {
    const updateBooking = await this.updateBooking.update(request)
    return ok(updateBooking)
  }
}

export namespace UpdateBookingController {
  export type Request = {
    bookingId: string
    startDate: Date
    endDate: Date
    numNight: number
    mumGuest: number
    cabinPrice: number
    extraPrice: number
    totalPrice: number
    status: string
    hasBreakfast: boolean
    isPaid: boolean
    observations: string
    cabinId: string
    userId: string
  }
}
