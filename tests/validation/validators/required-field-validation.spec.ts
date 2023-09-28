import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/validation/validators'
import { faker } from '@faker-js/faker'

const field = faker.lorem.word()

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation(field)
  return {
    sut
  }
}

describe('Required Field Validation', () => {
  test('should return MissingParamError if validation fails ', () => {
    const { sut } = makeSut()
    const error = sut.validate({ invalidField: faker.lorem.word() })
    expect(error).toEqual(new MissingParamError(field))
  })

  test('should not return null if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [field]: faker.lorem.word() })
    expect(error).toBeNull()
  })
})
