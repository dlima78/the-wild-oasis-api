import { LoadBookingsController } from '@/presentation/controllers'
import { LoadBookingsSpy } from '@/tests/presentation/mocks'

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
})
