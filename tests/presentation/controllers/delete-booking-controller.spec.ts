import { DeleteBookingController } from '@/presentation/controllers'
import { DeleteBookingSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  deleteBookingSpy: DeleteBookingSpy
  sut: DeleteBookingController
}

const makeSut = (): SutTypes => {
  const deleteBookingSpy = new DeleteBookingSpy()
  const sut = new DeleteBookingController(deleteBookingSpy)
  return {
    deleteBookingSpy,
    sut
  }
}

const mockRequest = (): DeleteBookingController.Request => ({
  bookingId: faker.string.uuid()
})

describe('DeleteBooking controller', () => {
  test('should call DeleteBooking with correct id', async () => {
    const { sut, deleteBookingSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deleteBookingSpy.bookingId).toEqual(request.bookingId)
  })
})
