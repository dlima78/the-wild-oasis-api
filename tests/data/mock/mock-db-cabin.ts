import {
  type SaveCabinRepository,
  type LoadCabinsRepository,
  type AddCabinRepository,
  type LoadCabinByIdRepository
} from '@/data/protocols'
import { type CabinModel } from '@/domain/models'
import { mockCabinModels } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'

export class LoadCabinsRepositorySpy implements LoadCabinsRepository {
  result = mockCabinModels()
  async loadAll (): Promise<LoadCabinsRepository.Result> {
    return this.result
  }
}

export class LoadCabinByIdRepositorySpy implements LoadCabinByIdRepository {
  id = ''
  result = {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    maxCapacity: faker.number.int(100),
    regularPrice: faker.number.float({ precision: 0.01 }),
    discount: faker.number.float({ precision: 0.01 }),
    description: faker.lorem.words(),
    image: faker.image.url()
  }

  async loadById (id: string): Promise<CabinModel> {
    this.id = id
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
  result = true
  async add (data: SaveCabinRepository.Params): Promise<boolean> {
    this.data = data
    return this.result
  }
}
