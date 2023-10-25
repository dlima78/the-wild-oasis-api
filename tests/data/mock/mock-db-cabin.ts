import {
  type SaveCabinRepository,
  type LoadCabinsRepository
} from '@/data/protocols'
import { mockCabinModels } from '@/tests/domain/mocks'

export class LoadCabinsRepositorySpy implements LoadCabinsRepository {
  result = mockCabinModels()
  async loadAll (): Promise<LoadCabinsRepository.Result> {
    return this.result
  }
}

export class SaveCabinRepositorySpy implements SaveCabinRepository {
  data!: SaveCabinRepository.Params
  async save (data: SaveCabinRepository.Params): Promise<void> {
    this.data = data
  }
}
