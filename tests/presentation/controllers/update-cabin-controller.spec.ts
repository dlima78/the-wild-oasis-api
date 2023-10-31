import { type UpdateCabin } from '@/domain/usecases/update-cabin'
import { UpdateCabinController } from '@/presentation/controllers'
import { mockCabinModel } from '@/tests/domain/mocks'
import { ok, serverError } from '@/presentation/helpers'

import { faker } from '@faker-js/faker'

const mockRequest = (): UpdateCabinController.Request => ({
  cabinId: faker.string.uuid(),
  name: faker.person.firstName(),
  maxCapacity: faker.number.int(),
  regularPrice: faker.number.float(),
  discount: faker.number.int(),
  description: faker.lorem.words()
})

export class UpdateCabinSpy implements UpdateCabin {
  params: UpdateCabin.Params = {
    cabinId: '',
    name: '',
    maxCapacity: 0,
    regularPrice: 0,
    discount: 0,
    description: ''
  }

  result = mockCabinModel()
  async update (params: UpdateCabin.Params): Promise<UpdateCabin.Result> {
    this.params = params
    return this.result
  }
}

interface SutTypes {
  sut: UpdateCabinController
  updateCabinSpy: UpdateCabinSpy
}

const makeSut = (): SutTypes => {
  const updateCabinSpy = new UpdateCabinSpy()
  const sut = new UpdateCabinController(updateCabinSpy)
  return {
    sut,
    updateCabinSpy
  }
}

describe('Update Cabin Controller', () => {
  test('Should call UpdateCabin with correct values', async () => {
    const { sut, updateCabinSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateCabinSpy.params).toEqual(request)
  })

  test('Should return 500 if UpdateCabin throws', async () => {
    const { sut, updateCabinSpy } = makeSut()
    jest.spyOn(updateCabinSpy, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(httpResponse.body))
  })
})
