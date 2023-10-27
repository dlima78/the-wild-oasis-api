import { AddCabinController } from '@/presentation/controllers'
import { AddCabinSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'

const mockRequest = (): AddCabinController.Request => ({
  name: faker.person.firstName(),
  maxCapacity: faker.number.int(),
  regularPrice: faker.number.float(),
  discount: faker.number.int(),
  description: faker.lorem.words()
})

type SutTypes = {
  addCabinSpy: AddCabinSpy
  sut: AddCabinController
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
