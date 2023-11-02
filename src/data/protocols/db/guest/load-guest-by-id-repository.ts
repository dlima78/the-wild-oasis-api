import { type GuestModel } from '@/domain/models'

export interface LoadGuestByIdRepository {
  loadById: (cabinId: string) => Promise<LoadGuestByIdRepository.Result>
}

export namespace LoadGuestByIdRepository {
  export type Result = GuestModel
}
