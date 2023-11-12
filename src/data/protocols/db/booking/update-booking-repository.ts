import { type BookingModel } from '@/domain/models'
import { type UpdateBooking } from '@/domain/usecases'

export interface UpdateBookingRepository {
  update: (data: UpdateBookingRepository.Params) => Promise<UpdateBookingRepository.Result>
}

export namespace UpdateBookingRepository {
  export type Params = UpdateBooking.Params

  export type Result = BookingModel
}
