import { type CabinModel } from '@/domain/models'

export interface LoadCabins {
  load: () => Promise<LoadCabins.Result>
}

export namespace LoadCabins {
  export type Result = CabinModel[]
}
