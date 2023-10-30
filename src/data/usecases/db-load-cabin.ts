import { type LoadCabinByIdRepository } from '@/data/protocols'
import { type LoadCabin } from '@/domain/usecases'

export class DbLoadCabin implements LoadCabin {
  constructor (
    private readonly loadCabinByIdRepository: LoadCabinByIdRepository
  ) {}

  async loadById (cabinId: string): Promise<LoadCabin.Result> {
    const cabin = await this.loadCabinByIdRepository.loadById(cabinId)
    return cabin
  }
}
