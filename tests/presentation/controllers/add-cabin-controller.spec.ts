import { type AddCabin } from '@/domain/usecases/add-cabin'
import { AddCabinController } from '@/presentation'
import { faker } from '@faker-js/faker'

const mockRequest = (): AddCabin.Params => ({
  name: faker.person.firstName(),
  maxCapacity: faker.number.int(),
  regularPrice: faker.number.float(),
  discount: faker.number.int(),
  description: faker.lorem.words()
})

export class AddCabinSpy implements AddCabin {
  params!: AddCabin.Params
  async add (data: AddCabin.Params): Promise<void> {
    this.params = data
  }
}

interface SutTypes {
  sut: AddCabinController
  addCabinSpy: AddCabinSpy
}

const makeSut = (): SutTypes => {
  const addCabinSpy = new AddCabinSpy()
  const sut = new AddCabinController(addCabinSpy)
  return {
    sut,
    addCabinSpy
  }
}

describe('Add Cabin Controller', () => {
  test('should call AddCabin with correct values', async () => {
    const { sut, addCabinSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addCabinSpy.params).toEqual({ ...request })
  })
})
