import { type CabinModel } from '@/domain/models'

export interface UpdateCabin {
  update: (params: UpdateCabin.Params) => Promise<UpdateCabin.Result>
}

export namespace UpdateCabin {
  export type Params = {
    cabinId: string
    name: string
    maxCapacity: number
    regularPrice: number
    discount: number
    description: string
    image?: string
  }

  export type Result = CabinModel
}
