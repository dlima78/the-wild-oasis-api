import {
  type LoadCabins,
  type AddCabin,
  type LoadCabin
} from '@/domain/usecases'
import { mockCabinModel, mockCabinModels } from '@/tests/domain/mocks'

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

export class LoadCabinSpy implements LoadCabin {
  result: LoadCabin.Result = mockCabinModel()
  id = ''
  async loadById (id: string): Promise<LoadCabin.Result> {
    this.id = id
    return this.result
  }
}
