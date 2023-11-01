import { AddGuestController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'
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
  sut: AddGuestController
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddGuestController(validationSpy)
  return {
    sut,
    validationSpy
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
})
