import { DbAddBooking } from '@/data/usecases'
import { mockAddBookingParams } from '@/tests/domain/mocks'
import { AddBookingRepositorySpy } from '@/tests/data/mock'

type SutTypes = {
  addBookingRepositorySpy: AddBookingRepositorySpy
  sut: DbAddBooking
}

const makeSut = (): SutTypes => {
  const addBookingRepositorySpy = new AddBookingRepositorySpy()
  const sut = new DbAddBooking(addBookingRepositorySpy)
  return {
    addBookingRepositorySpy,
    sut
  }
}

describe('DbAddBooking Usecase', () => {
  test('should call AddBookingRepository with correct values', async () => {
    const { sut, addBookingRepositorySpy } = makeSut()
    const addBookingParams = mockAddBookingParams()
    await sut.add(addBookingParams)
    expect(addBookingRepositorySpy.data).toEqual(addBookingParams)
  })
})
