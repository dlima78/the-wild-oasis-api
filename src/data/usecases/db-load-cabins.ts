import { type LoadCabins } from '@/domain/usecases/load-cabins'
import { type LoadCabinsRepository } from '@/data/protocols'

export class DbLoadCabins implements LoadCabins {
  constructor (private readonly loadCabinsRepository: LoadCabinsRepository) {}
  async load (): Promise<LoadCabins.Result> {
    return await this.loadCabinsRepository.loadAll()
  }
}
