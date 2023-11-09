import { LoadBookingByIdRepositorySpy } from '@/tests/data/mock'
import { DbLoadBooking } from '@/data/usecases'
import { faker } from '@faker-js/faker'

type SutTypes = {
  loadBookingByIdRepositorySpy: LoadBookingByIdRepositorySpy
  sut: DbLoadBooking
}

const makeSut = (): SutTypes => {
  const loadBookingByIdRepositorySpy = new LoadBookingByIdRepositorySpy()
  const sut = new DbLoadBooking(loadBookingByIdRepositorySpy)
  return {
    loadBookingByIdRepositorySpy,
    sut
  }
}

const id = faker.string.uuid()

describe('DbLoadBooking usecase', () => {
  test('should call LoadBookingByIdRepository with correct id', async () => {
    const { sut, loadBookingByIdRepositorySpy } = makeSut()
    const bookingId = id
    await sut.loadById(bookingId)
    expect(loadBookingByIdRepositorySpy.id).toBe(bookingId)
  })

  test('should throw if LoadBookingByIdRepository', async () => {
    const { sut, loadBookingByIdRepositorySpy } = makeSut()
    jest
      .spyOn(loadBookingByIdRepositorySpy, 'loadById')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const promise = sut.loadById(id)
    await expect(promise).rejects.toThrow()
  })
})
