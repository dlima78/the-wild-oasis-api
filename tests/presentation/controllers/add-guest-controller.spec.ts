import { AddGuestController } from '@/presentation/controllers'
import { AddGuestSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'
import { badRequest } from '@/presentation/helpers'

const mockRequest = (): AddGuestController.Request => ({
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  nationality: faker.location.country(),
  countryFlag: faker.lorem.word(3),
  nationalId: faker.location.countryCode()
})

type SutTypes = {
  validationSpy: ValidationSpy
  addGuestSpy: AddGuestSpy
  sut: AddGuestController
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addGuestSpy = new AddGuestSpy()
  const sut = new AddGuestController(validationSpy, addGuestSpy)
  return {
    sut,
    validationSpy,
    addGuestSpy
  }
}

describe('Add Guest Controller', () => {
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

  test('should call AddGuest with correct values', async () => {
    const { sut, addGuestSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addGuestSpy.params).toEqual(request)
  })
})
