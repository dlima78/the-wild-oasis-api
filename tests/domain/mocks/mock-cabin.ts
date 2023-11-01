import { type UpdateCabin } from '@/domain/usecases/update-cabin'
import { faker } from '@faker-js/faker'
import { type CabinModel } from '../models'
import { type AddCabin } from '../usecases'

export const mockAddCabinParams = (): AddCabin.Params => ({
  name: faker.person.fullName(),
  maxCapacity: faker.number.int(),
  regularPrice: faker.number.int(),
  discount: faker.number.int(),
  description: faker.lorem.text(),
  image: faker.image.url()
})
export const mockUpdateCabinParams = (): UpdateCabin.Params => ({
  cabinId: faker.string.uuid(),
  name: faker.person.fullName(),
  maxCapacity: faker.number.int(),
  regularPrice: faker.number.int(),
  discount: faker.number.int(),
  description: faker.lorem.text(),
  image: faker.image.url()
})

export const mockCabinModel = (): CabinModel => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  maxCapacity: faker.number.int(50),
  regularPrice: faker.number.float({ precision: 0.01 }),
  discount: faker.number.float({ precision: 0.01 }),
  description: faker.lorem.word(),
  image: faker.image.url()
})

export const mockCabinModels = (): CabinModel[] => [
  mockCabinModel(),
  mockCabinModel()
]
