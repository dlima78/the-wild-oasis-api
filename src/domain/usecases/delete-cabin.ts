export interface DeleteCabin {
  delete: (cabinId: DeleteCabin.Param) => Promise<boolean>
}

export namespace DeleteCabin {
  export type Param = {
    cabinId: string
  }
}
