import { type CabinModel } from '@/domain/models'

export interface AddCabin {
  add: (data: AddCabin.Params) => Promise<void>
}

export namespace AddCabin {
  export type Params = Omit<CabinModel, 'id'>
}
