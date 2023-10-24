import { type SaveCabinRepository } from '@/data/protocols'
import { type SaveCabin } from '@/domain/usecases/save-cabin'

export class DbSaveCabin implements SaveCabin {
  constructor (private readonly saveCabinRepository: SaveCabinRepository) {}

  async save (data: SaveCabin.Params): Promise<void> {
    await this.saveCabinRepository.save(data)
  }
}
