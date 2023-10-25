import { type CabinModel } from '@/domain/models'

export interface LoadCabin {
  loadById: (cabinId: string) => Promise<LoadCabin.Result>
}

export namespace LoadCabin {
  export type Result = CabinModel
}
