import { type CabinModel } from '@/domain/models'

export interface SaveCabin {
  save: (data: SaveCabin.Params) => Promise<void>
}

export namespace SaveCabin {
  export type Params = Omit<CabinModel, 'id'>
}
