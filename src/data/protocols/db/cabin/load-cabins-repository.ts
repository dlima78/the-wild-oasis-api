import { type CabinModel } from '@/domain/models'

export interface LoadCabinsRepository {
  loadAll: () => Promise<LoadCabinsRepository.Result>
}

export namespace LoadCabinsRepository {
  export type Result = CabinModel[]
}
