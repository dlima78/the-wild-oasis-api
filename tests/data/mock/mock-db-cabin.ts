import { type LoadCabinsRepository } from '@/data/protocols'
import { mockCabinModels } from '@/tests/domain/mocks'

export class LoadCabinsRepositorySpy implements LoadCabinsRepository {
  result = mockCabinModels()
  async loadAll (): Promise<LoadCabinsRepository.Result> {
    return this.result
  }
}
