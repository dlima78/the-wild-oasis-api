import { LoadBookingController } from '@/presentation/controllers'
import { LoadBookingSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'
import { ok } from '@/presentation/helpers'

type SutTypes = {
  loadBookingSpy: LoadBookingSpy
  sut: LoadBookingController
}

const makeSut = (): SutTypes => {
  const loadBookingSpy = new LoadBookingSpy()
  const sut = new LoadBookingController(loadBookingSpy)
  return {
    loadBookingSpy,
    sut
  }
}

const mockRequest = (): LoadBookingController.Request => ({
  bookingId: faker.string.uuid()
})

describe('LoadBooking controller', () => {
  test('should call LoadBooking with correct id', async () => {
    const { sut, loadBookingSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadBookingSpy.bookingId).toEqual(request.bookingId)
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(httpResponse.body))
  })
})
