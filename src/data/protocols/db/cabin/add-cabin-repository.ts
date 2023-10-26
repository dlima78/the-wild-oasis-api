import { type AddCabin } from '@/domain/usecases'

export interface AddCabinRepository {
  add: (data: AddCabinRepository.Params) => Promise<boolean>
}

export namespace AddCabinRepository {
  export type Params = AddCabin.Params
}
