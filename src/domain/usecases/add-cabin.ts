import { type CabinModel } from '@/domain/models'

export interface AddCabin {
  add: (data: AddCabin.Params) => Promise<boolean>
}

export namespace AddCabin {
  export type Params = {
    name: string
    maxCapacity: number
    regularPrice: number
    discount: number
    description: string
    image?: string
  }

  export type Result = CabinModel
}
