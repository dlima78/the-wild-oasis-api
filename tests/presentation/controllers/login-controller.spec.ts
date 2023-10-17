import { LoginController } from '@/presentation/controllers'
import { AuthenticationSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'

import { faker } from '@faker-js/faker'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
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
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(validationSpy, authenticationSpy)
  return {
    authenticationSpy,
    validationSpy,
    sut
  }
}

describe('Login Controller', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.lorem.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual(request)
  })
})
