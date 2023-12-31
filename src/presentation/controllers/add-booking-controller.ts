import { type HttpResponse, type Controller, type Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '../helpers'
import { type AddBooking } from '@/domain/usecases'

export class AddBookingController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addBooking: AddBooking
  ) {}

  async handle (request: AddBookingController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.addBooking.add(request)
      return noContent()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace AddBookingController {
  export type Request = {
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
