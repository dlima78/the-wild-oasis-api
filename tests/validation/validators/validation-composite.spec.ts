import { MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { ValidationComposite } from '@/validation/validators'
import { faker } from '@faker-js/faker'

const field = faker.lorem.word()

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('Validation Composite', () => {
  test('should return error if any validation fails ', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: faker.lorem.word() })
    expect(error).toEqual(validationSpies[1].error)
  })
})
