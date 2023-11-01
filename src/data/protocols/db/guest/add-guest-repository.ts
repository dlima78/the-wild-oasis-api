import { type AddGuest } from '@/domain/usecases'

export interface AddGuestRepository {
  add: (
    data: AddGuestRepository.Params
  ) => Promise<AddGuestRepository.Result>
}

export namespace AddGuestRepository {
  export type Params = AddGuest.Params
  export type Result = boolean
}
