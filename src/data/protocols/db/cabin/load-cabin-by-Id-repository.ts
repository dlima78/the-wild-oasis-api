import { type CabinModel } from '@/domain/models'

export interface LoadCabinByIdRepository {
  loadById: (id: string) => Promise<LoadCabinByIdRepository.Result>
}

export namespace LoadCabinByIdRepository {
  export type Result = CabinModel
}
