import { type AddBooking } from '@/domain/usecases'

export interface AddBookingRepository {
  add: (data: AddBookingRepository.Params) => Promise<AddBookingRepository.Result>
}

export namespace AddBookingRepository {
  export type Params = AddBooking.Params
  export type Result = boolean
}
