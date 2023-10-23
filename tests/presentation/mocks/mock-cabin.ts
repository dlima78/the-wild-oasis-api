import { type LoadCabins } from '@/domain/usecases'
import { mockCabinModels } from '@/tests/domain/mocks'

export class LoadCabinsSpy implements LoadCabins {
  result = mockCabinModels()
  async load (): Promise<LoadCabins.Result> {
    return this.result
  }
}
