import { type GuestModel } from '@/domain/models'

export interface LoadGuestsRepository {
  loadAll: () => Promise<LoadGuestsRepository.Result>
}

export namespace LoadGuestsRepository {
  export type Result = GuestModel[]
}
