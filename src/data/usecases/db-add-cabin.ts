import { type AddCabinRepository } from '@/data/protocols'
import { type AddCabin } from '@/domain/usecases'

export class DbAddCabin implements AddCabin {
  constructor (private readonly addCabinRepository: AddCabinRepository) {}
  async add (data: AddCabin.Params): Promise<boolean> {
    return await this.addCabinRepository.add(data)
  }
}
