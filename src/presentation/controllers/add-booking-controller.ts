import { type HttpResponse, type Controller, type Validation } from '@/presentation/protocols'
import { badRequest } from '../helpers'

export class AddBookingController implements Controller {
  constructor (private readonly validation: Validation) {}

  async handle (request: AddBookingController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return {
      statusCode: 0,
      body: 0
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
