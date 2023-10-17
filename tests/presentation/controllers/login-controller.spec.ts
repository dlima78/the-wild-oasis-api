import { LoginController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'

import { faker } from '@faker-js/faker'

type SutTypes = {
  validationSpy: ValidationSpy
  sut: LoginController
}

const mockRequest = (): LoginController.Request => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(validationSpy)
  return {
    validationSpy,
    sut
  }
}

describe('Login Controller', () => {
  test('should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
