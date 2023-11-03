import { type GuestModel } from '@/domain/models'
import { type UpdateGuest } from '@/domain/usecases'

export interface UpdateGuestRepository {
  update: (
    data: UpdateGuestRepository.Params
  ) => Promise<UpdateGuestRepository.Result>
}

export namespace UpdateGuestRepository {
  export type Params = UpdateGuest.Params

  export type Result = GuestModel
}
