import { type SaveCabin } from '@/domain/usecases/save-cabin'
import { SaveCabinController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'

const mockRequest = (): SaveCabinController.Request => ({
  name: faker.person.firstName(),
  maxCapacity: faker.number.int(),
  regularPrice: faker.number.float(),
  discount: faker.number.int(),
  description: faker.lorem.words()
})

export class SaveCabinSpy implements SaveCabin {
  params: SaveCabin.Params = {
    name: '',
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
    description: ''
  }

  async save (data: SaveCabin.Params): Promise<void> {
    this.params = data
  }
}

interface SutTypes {
  sut: SaveCabinController
  saveCabinSpy: SaveCabinSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const saveCabinSpy = new SaveCabinSpy()
  const sut = new SaveCabinController(saveCabinSpy, validationSpy)
  return {
    sut,
    saveCabinSpy,
    validationSpy
  }
}

describe('Save Cabin Controller', () => {
  test('should call SaveCabin with correct values', async () => {
    const { sut, saveCabinSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveCabinSpy.params).toEqual({ ...request })
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

  test('should return 500 if SaveCabin throws', async () => {
    const { sut, saveCabinSpy } = makeSut()
    jest.spyOn(saveCabinSpy, 'save').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
