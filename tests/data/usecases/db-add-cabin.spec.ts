import { DbAddCabin } from '@/data/db'
import { type AddCabinRepository } from '@/data/protocols'
import { type AddCabin } from '@/domain/usecases/add-cabin'
import { faker } from '@faker-js/faker'

export class AddCabinRepositorySpy implements AddCabinRepository {
  params!: AddCabinRepository.Params

  async add (params: AddCabinRepository.Params): Promise<void> {
    this.params = params
  }
}

const mockAddCabinParams = (): AddCabin.Params => ({
  name: faker.person.fullName(),
  maxCapacity: faker.number.int(),
  regularPrice: faker.number.int(),
  discount: faker.number.int(),
  description: faker.lorem.text(),
  image: faker.image.url()
})

interface SutTypes {
  sut: DbAddCabin
  addCabinRepositorySpy: AddCabinRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCabinRepositorySpy = new AddCabinRepositorySpy()
  const sut = new DbAddCabin(addCabinRepositorySpy)
  return {
    addCabinRepositorySpy,
    sut
  }
}

describe('DbAddCAbin', () => {
  test('should call AddCabinRepository with correct values', async () => {
    const { sut, addCabinRepositorySpy } = makeSut()
    const cabinData = mockAddCabinParams()
    await sut.add(cabinData)
    expect(addCabinRepositorySpy.params).toEqual(cabinData)
  })
})
