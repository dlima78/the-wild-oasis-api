import { type DeleteCabin } from '@/domain/usecases'

export interface DeleteCabinRepository {
  delete: (cabinId: DeleteCabinRepository.Param) => Promise<boolean>
}

export namespace DeleteCabinRepository {
  export type Param = DeleteCabin.Param
}
