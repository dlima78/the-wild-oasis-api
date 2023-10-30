import { LoadCabinController } from '@/presentation/controllers'
import { LoadCabinSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'
import { ok } from '@/presentation/helpers'

type SutTypes = {
  loadCabinSpy: LoadCabinSpy
  sut: LoadCabinController
}

const makeSut = (): SutTypes => {
  const loadCabinSpy = new LoadCabinSpy()
  const sut = new LoadCabinController(loadCabinSpy)
  return {
    loadCabinSpy,
    sut
  }
}

const mockRequest = (): LoadCabinController.Request => ({
  id: faker.string.uuid()
})

describe('LoadCabin controller', () => {
  test('should call LoadCabin with correct id', async () => {
    const { sut, loadCabinSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadCabinSpy.id).toEqual(request.id)
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(httpResponse.body))
  })
})
