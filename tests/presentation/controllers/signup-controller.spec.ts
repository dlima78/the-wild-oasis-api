import { SignupController } from '@/presentation/controllers'
import { AddAccountSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
  sut: SignupController
}

const mockRequest = (): SignupController.Request => {
  const password = faker.internet.password()
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const sut = new SignupController(addAccountSpy, validationSpy)
  return {
    validationSpy,
    addAccountSpy,
    sut
  }
}

describe('Signup Controller', () => {
  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addAccountSpy.params).toEqual({
      name: request.name,
      email: request.email,
      password: request.password,
      passwordConfirmation: request.passwordConfirmation
    })
  })

  test('should call validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})