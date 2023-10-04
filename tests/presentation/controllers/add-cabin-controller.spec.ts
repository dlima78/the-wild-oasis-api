import { type AddCabin } from '@/domain/usecases/add-cabin'
import { AddCabinController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'

const mockRequest = (): AddCabinController.Request => ({
  name: faker.person.firstName(),
  maxCapacity: faker.number.int(),
  regularPrice: faker.number.float(),
  discount: faker.number.int(),
  description: faker.lorem.words()
})

export class AddCabinSpy implements AddCabin {
  params: AddCabin.Params = {
    name: '',
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
    description: ''
  }

  async add (data: AddCabin.Params): Promise<void> {
    this.params = data
  }
}

interface SutTypes {
  sut: AddCabinController
  addCabinSpy: AddCabinSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addCabinSpy = new AddCabinSpy()
  const sut = new AddCabinController(addCabinSpy, validationSpy)
  return {
    sut,
    addCabinSpy,
    validationSpy
  }
}

describe('Add Cabin Controller', () => {
  test('should call AddCabin with correct values', async () => {
    const { sut, addCabinSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addCabinSpy.params).toEqual({ ...request })
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    const error = (validationSpy.error = new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  test('should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('should return 500 if AddCabin throws', async () => {
    const { sut, addCabinSpy } = makeSut()
    jest.spyOn(addCabinSpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
