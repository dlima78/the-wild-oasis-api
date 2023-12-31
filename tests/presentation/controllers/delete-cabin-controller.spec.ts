import { DeleteCabinController } from '@/presentation/controllers'
import { DeleteCabinSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'
import { forbidden, noContent, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

type SutTypes = {
  deleteCabinSpy: DeleteCabinSpy
  sut: DeleteCabinController
}

const makeSut = (): SutTypes => {
  const deleteCabinSpy = new DeleteCabinSpy()
  const sut = new DeleteCabinController(deleteCabinSpy)
  return {
    deleteCabinSpy,
    sut
  }
}

const mockRequest = (): DeleteCabinController.Request => ({
  cabinId: faker.string.uuid()
})

describe('DeleteCabin controller', () => {
  test('should call DeleteCabin with correct id', async () => {
    const { sut, deleteCabinSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteCabinSpy.cabinId).toEqual(request.cabinId)
  })

  test('should return 403 if DeleteCabin returns false', async () => {
    const { sut, deleteCabinSpy } = makeSut()
    deleteCabinSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('cabinId')))
  })

  test('should return 500 if DeleteCabin throws', async () => {
    const { sut, deleteCabinSpy } = makeSut()
    jest.spyOn(deleteCabinSpy, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
