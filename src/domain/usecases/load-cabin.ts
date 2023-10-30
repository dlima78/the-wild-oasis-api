import { type CabinModel } from '@/domain/models'

export interface LoadCabin {
  loadById: (id: string) => Promise<LoadCabin.Result>
}

export namespace LoadCabin {
  export type Result = CabinModel | null
}
