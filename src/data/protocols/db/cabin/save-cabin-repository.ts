import { type SaveCabin } from '@/domain/usecases/save-cabin'

export interface SaveCabinRepository {
  save: (data: SaveCabinRepository.Params) => Promise<void>
}

export namespace SaveCabinRepository {
  export type Params = SaveCabin.Params
}
