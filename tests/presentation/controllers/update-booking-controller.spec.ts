import { faker } from '@faker-js/faker'
import { UpdateBookingController } from '@/presentation/controllers'

import { UpdateBookingSpy } from '@/tests/presentation/mocks'
import { ok, serverError } from '@/presentation/helpers'

const mockRequest = (): UpdateBookingController.Request => ({
  bookingId: faker.string.uuid(),
  startDate: faker.date.recent(),
  endDate: faker.date.future(),
  numNight: faker.number.int(30),
  mumGuest: faker.number.int(30),
  cabinPrice: faker.number.float({ precision: 0.01 }),
  extraPrice: faker.number.float({ precision: 0.01 }),
  totalPrice: faker.number.float({ precision: 0.01 }),
  status: faker.lorem.word(),
  hasBreakfast: faker.datatype.boolean(),
  isPaid: faker.datatype.boolean(),
  observations: faker.lorem.words(),
  cabinId: faker.string.uuid(),
  userId: faker.string.uuid()
})

interface SutTypes {
  sut: UpdateBookingController
  updateBookingSpy: UpdateBookingSpy
}

const makeSut = (): SutTypes => {
  const updateBookingSpy = new UpdateBookingSpy()
  const sut = new UpdateBookingController(updateBookingSpy)
  return {
    sut,
    updateBookingSpy
  }
}

describe('Update Booking Controller', () => {
  test('Should call UpdateBooking with correct values', async () => {
    const { sut, updateBookingSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateBookingSpy.params).toEqual(request)
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(httpResponse.body))
  })

  test('Should return 500 if UpdateCabin throws', async () => {
    const { sut, updateBookingSpy } = makeSut()
    jest.spyOn(updateBookingSpy, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
