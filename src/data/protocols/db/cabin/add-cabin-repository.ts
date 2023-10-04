import { type AddCabin } from '@/domain/usecases/add-cabin'

export interface AddCabinRepository {
  add: (data: AddCabinRepository.Params) => Promise<void>
}

export namespace AddCabinRepository {
  export type Params = AddCabin.Params
}
