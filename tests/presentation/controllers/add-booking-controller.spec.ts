import { AddBookingController } from '@/presentation/controllers'
import { AddBookingSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'
import { badRequest } from '@/presentation/helpers'

const mockRequest = (): AddBookingController.Request => ({
  startDate: faker.date.soon(),
  endDate: faker.date.future(),
  numNight: faker.number.int(10),
  mumGuest: faker.number.int(10),
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

type SutTypes = {
  validationSpy: ValidationSpy
  addBookingSpy: AddBookingSpy
  sut: AddBookingController
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addBookingSpy = new AddBookingSpy()
  const sut = new AddBookingController(validationSpy, addBookingSpy)
  return {
    sut,
    validationSpy,
    addBookingSpy
  }
}

describe('Add Booking Controller', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('should return 400 if Validtion fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('should call AddBooking with correct values', async () => {
    const { sut, addBookingSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addBookingSpy.params).toEqual({ ...request })
  })
})
