import { LoadGuestController } from '@/presentation/controllers'
import { LoadGuestSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'
import { ok } from '@/presentation/helpers'

type SutTypes = {
  loadGuestSpy: LoadGuestSpy
  sut: LoadGuestController
}

const makeSut = (): SutTypes => {
  const loadGuestSpy = new LoadGuestSpy()
  const sut = new LoadGuestController(loadGuestSpy)
  return {
    sut,
    loadGuestSpy
  }
}

const mockRequest = (): LoadGuestController.Request => ({
  cabinId: faker.string.uuid()
})

describe('Load Guests Controller', () => {
  test('should call LoadGuest with correct value', async () => {
    const { sut, loadGuestSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadGuestSpy.cabinId).toBe(request.cabinId)
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(httpResponse.body))
  })
})
