import { type CabinModel } from '@/domain/models'

export interface LoadCabinById {
  loadById: (id: string) => Promise<LoadCabinById.Result>
}

export namespace LoadCabinById {
  export type Result = CabinModel
}
