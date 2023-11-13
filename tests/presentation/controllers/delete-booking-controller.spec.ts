import { DeleteBookingController } from '@/presentation/controllers'
import { DeleteBookingSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, noContent, serverError } from '@/presentation/helpers'

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

  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 500 if DeleteCabin throws', async () => {
    const { sut, deleteBookingSpy } = makeSut()
    jest.spyOn(deleteBookingSpy, 'delete').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
