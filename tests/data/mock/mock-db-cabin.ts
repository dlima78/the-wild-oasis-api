import {
  type UpdateCabinRepository,
  type LoadCabinsRepository,
  type AddCabinRepository,
  type LoadCabinByIdRepository,
  type DeleteCabinRepository
} from '@/data/protocols'
import { type CabinModel } from '@/domain/models'
import { type DeleteCabin } from '@/domain/usecases'
import { mockCabinModel, mockCabinModels } from '@/tests/domain/mocks'
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

export class UpdateCabinRepositorySpy implements UpdateCabinRepository {
  data!: UpdateCabinRepository.Params
  result = mockCabinModel()
  async update (data: UpdateCabinRepository.Params): Promise<UpdateCabinRepository.Result> {
    this.data = data
    return this.result
  }
}

export class AddCabinRepositorySpy implements AddCabinRepository {
  data!: AddCabinRepository.Params
  result = true
  async add (data: AddCabinRepository.Params): Promise<boolean> {
    this.data = data
    return this.result
  }
}

export class DeleteCabinRepositorySpy implements DeleteCabinRepository {
  cabinId!: DeleteCabinRepository.Param
  result = true
  async delete (cabinId: DeleteCabin.Param): Promise<boolean> {
    this.cabinId = cabinId
    return this.result
  }
}
