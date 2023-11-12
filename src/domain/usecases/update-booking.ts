import { type BookingModel } from '@/domain/models'

export interface UpdateBooking {
  update: (params: UpdateBooking.Params) => Promise<UpdateBooking.Result>
}

export namespace UpdateBooking {
  export type Params = {
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

  export type Result = BookingModel
}
