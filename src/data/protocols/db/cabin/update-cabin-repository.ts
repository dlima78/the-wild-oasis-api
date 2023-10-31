import { type CabinModel } from '@/domain/models'
import { type UpdateCabin } from '@/domain/usecases/update-cabin'

export interface UpdateCabinRepository {
  update: (
    data: UpdateCabinRepository.Params
  ) => Promise<UpdateCabinRepository.Result>
}

export namespace UpdateCabinRepository {
  export type Params = UpdateCabin.Params

  export type Result = CabinModel
}
