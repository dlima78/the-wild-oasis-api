export interface SaveCabin {
  save: (data: SaveCabin.Params) => Promise<void>
}

export namespace SaveCabin {
  export type Params = {
    id?: string
    name: string
    maxCapacity: number
    regularPrice: number
    discount: number
    description: string
    image?: string
  }
}
