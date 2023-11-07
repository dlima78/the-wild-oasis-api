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

  test('should return true on success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockAddBookingParams())
    expect(isValid).toBe(true)
  })

  test('should return false if AddBookingRepository returns false', async () => {
    const { sut, addBookingRepositorySpy } = makeSut()
    addBookingRepositorySpy.result = false
    const isValid = await sut.add(mockAddBookingParams())
    expect(isValid).toBe(false)
  })

  test('should throw if AddBookingRepository throws', async () => {
    const { sut, addBookingRepositorySpy } = makeSut()
    jest.spyOn(addBookingRepositorySpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.add(mockAddBookingParams())
    await expect(promise).rejects.toThrow()
  })
})
