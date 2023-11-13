import { DeleteBookingController } from '@/presentation/controllers'
import { DeleteBookingSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers'

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

  test('should return 403 if DeleteBooking returns false', async () => {
    const { sut, deleteBookingSpy } = makeSut()
    deleteBookingSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('bookingId')))
  })
})
