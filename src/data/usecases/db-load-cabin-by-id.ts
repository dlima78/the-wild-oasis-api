import { type LoadCabinByIdRepository } from '@/data/protocols'
import { type LoadCabinById } from '@/domain/usecases'

export class DbLoadCabinById implements LoadCabinById {
  constructor (
    private readonly loadCabinByIdRepository: LoadCabinByIdRepository
  ) {}

  async loadById (id: string): Promise<LoadCabinById.Result> {
    const cabin = await this.loadCabinByIdRepository.loadById(id)
    return cabin
  }
}
