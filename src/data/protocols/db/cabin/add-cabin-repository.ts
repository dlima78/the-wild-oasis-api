import { type AddCabin } from '@/domain/usecases'

export interface AddCabinRepository {
  add: (data: AddCabinRepository.Params) => Promise<void>
}

export namespace AddCabinRepository {
  export type Params = AddCabin.Params
}
