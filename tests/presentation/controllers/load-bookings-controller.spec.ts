import { LoadBookingsController } from '@/presentation/controllers'
import { LoadBookingsSpy } from '@/tests/presentation/mocks'
import { noContent, ok, serverError } from '@/presentation/helpers'

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

  test('should return 204 if LoadBookings returns empty', async () => {
    const { sut, loadBookingsSpy } = makeSut()
    loadBookingsSpy.result = []
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })

  test('should returs 500 if LoadBookings throws', async () => {
    const { sut, loadBookingsSpy } = makeSut()
    jest.spyOn(loadBookingsSpy, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
