import { DbUpdateBooking } from '@/data/usecases'
import { mockUpdateBookingParams } from '@/tests/domain/mocks'
import { UpdateBookingRepositorySpy } from '@/tests/data/mock'

interface SutTypes {
  sut: DbUpdateBooking
  updateBookingRepositorySpy: UpdateBookingRepositorySpy
}

const makeSut = (): SutTypes => {
  const updateBookingRepositorySpy = new UpdateBookingRepositorySpy()
  const sut = new DbUpdateBooking(updateBookingRepositorySpy)
  return {
    updateBookingRepositorySpy,
    sut
  }
}

describe('DbUpdateBooking', () => {
  test('should call UpdateBookingRepository with correct values', async () => {
    const { sut, updateBookingRepositorySpy } = makeSut()
    const bookingData = mockUpdateBookingParams()
    await sut.update(bookingData)
    expect(updateBookingRepositorySpy.data).toEqual(bookingData)
  })
})
