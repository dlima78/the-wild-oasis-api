import { type LoadCabins, type AddCabin } from '@/domain/usecases'
import { mockCabinModels } from '@/tests/domain/mocks'

export class LoadCabinsSpy implements LoadCabins {
  result = mockCabinModels()
  async load (): Promise<LoadCabins.Result> {
    return this.result
  }
}

export class AddCabinSpy implements AddCabin {
  params!: AddCabin.Params

  result = true

  async add (params: AddCabin.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}
