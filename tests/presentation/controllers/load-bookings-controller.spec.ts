import { LoadBookingsController } from '@/presentation/controllers'
import { LoadBookingsSpy } from '@/tests/presentation/mocks'
import { ok } from '@/presentation/helpers'

type SutTypes = {
  loadBookingsSpy: LoadBookingsSpy
  sut: LoadBookingsController
}

const makeSut = (): SutTypes => {
  const loadBookingsSpy = new LoadBookingsSpy()
  const sut = new LoadBookingsController(loadBookingsSpy)
  return {
    loadBookingsSpy,
    sut
  }
}

describe('LoadBookings controller', () => {
  test('should call LoadBookings', async () => {
    const { sut, loadBookingsSpy } = makeSut()
    const BookingSpy = jest.spyOn(loadBookingsSpy, 'load')
    await sut.handle()
    expect(BookingSpy).toHaveBeenCalled()
  })

  test('should return 200 on success', async () => {
    const { sut, loadBookingsSpy } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(loadBookingsSpy.result))
  })
})
