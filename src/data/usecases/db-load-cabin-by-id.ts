import { type LoadCabinByIdRepository } from '@/data/protocols'
import { type LoadCabinById } from '@/domain/usecases'

export class DbLoadCabinById implements LoadCabinById {
  constructor (
    private readonly loadCabinByIdRepository: LoadCabinByIdRepository
  ) {}

  async loadById (id: string): Promise<LoadCabinById.Result> {
    await this.loadCabinByIdRepository.loadById(id)
    return {
      id: '',
      name: '',
      maxCapacity: 0,
      regularPrice: 0,
      discount: 0,
      description: '',
      image: ''
    }
  }
}
