import { type AddCabinRepository } from '@/data/protocols'
import { type AddCabin } from '@/domain/usecases/add-cabin'

export class DbAddCabin implements AddCabin {
  constructor (private readonly addCabinRepository: AddCabinRepository) {}

  async add (data: AddCabin.Params): Promise<void> {
    await this.addCabinRepository.add(data)
  }
}
