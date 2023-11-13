import { DbDeleteBooking } from '@/data/usecases'
import { DeleteBookingRepositorySpy } from '@/tests/data/mock'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: DbDeleteBooking
  deleteBookingRepositorySpy: DeleteBookingRepositorySpy
}

const makeSut = (): SutTypes => {
  const deleteBookingRepositorySpy = new DeleteBookingRepositorySpy()
  const sut = new DbDeleteBooking(deleteBookingRepositorySpy)
  return {
    deleteBookingRepositorySpy,
    sut
  }
}

const bookingId = faker.string.uuid()

describe('DbUpdateBooking', () => {
  test('should call DeleteBookingRepository with correct id', async () => {
    const { sut, deleteBookingRepositorySpy } = makeSut()
    await sut.delete(bookingId)
    expect(deleteBookingRepositorySpy.bookingId).toEqual(bookingId)
  })

  test('should return false if DeleteBookingRepository returns false', async () => {
    const { sut, deleteBookingRepositorySpy } = makeSut()
    deleteBookingRepositorySpy.result = false
    const isValid = await sut.delete(bookingId)
    expect(isValid).toBe(false)
  })
})
