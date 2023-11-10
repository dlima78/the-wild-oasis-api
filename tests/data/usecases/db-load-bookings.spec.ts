import { LoadBookingsRepositorySpy } from '@/tests/data/mock'
import { DbLoadBookings } from '@/data/usecases'

type SutTypes = {
  loadBookingsRepositorySpy: LoadBookingsRepositorySpy
  sut: DbLoadBookings
}

const makeSut = (): SutTypes => {
  const loadBookingsRepositorySpy = new LoadBookingsRepositorySpy()
  const sut = new DbLoadBookings(loadBookingsRepositorySpy)
  return {
    loadBookingsRepositorySpy,
    sut
  }
}

describe('DbLoadBookings usecase', () => {
  test('should call LoadBookingsRepository', async () => {
    const { sut, loadBookingsRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadBookingsRepositorySpy, 'loadAll')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should returns a list of booking on success', async () => {
    const { sut, loadBookingsRepositorySpy } = makeSut()
    const booking = await sut.load()
    expect(loadBookingsRepositorySpy.result).toEqual(booking)
  })
})
