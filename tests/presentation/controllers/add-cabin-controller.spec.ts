import { AddCabinController } from '@/presentation/controllers'
import { AddCabinSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'
import { badRequest, noContent, serverError } from '@/presentation/helpers'

const mockRequest = (): AddCabinController.Request => ({
  name: faker.person.firstName(),
  maxCapacity: faker.number.int(),
  regularPrice: faker.number.float(),
  discount: faker.number.int(),
  description: faker.lorem.words()
})

type SutTypes = {
  addCabinSpy: AddCabinSpy
  validationSpy: ValidationSpy
  sut: AddCabinController
}

const makeSut = (): SutTypes => {
  const addCabinSpy = new AddCabinSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddCabinController(addCabinSpy, validationSpy)
  return {
    sut,
    addCabinSpy,
    validationSpy
  }
}

describe('Add Cabin Controller', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('should return 400 if Validtion fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('should call AddCabin with correct values', async () => {
    const { sut, addCabinSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addCabinSpy.params).toEqual({ ...request })
  })

  test('should return 500 if AddCabin throws', async () => {
    const { sut, addCabinSpy } = makeSut()
    jest.spyOn(addCabinSpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
