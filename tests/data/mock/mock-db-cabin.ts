import {
  type SaveCabinRepository,
  type LoadCabinsRepository,
  type AddCabinRepository
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

export class AddCabinRepositorySpy implements AddCabinRepository {
  data!: AddCabinRepository.Params
  async add (data: SaveCabinRepository.Params): Promise<void> {
    this.data = data
  }
}
