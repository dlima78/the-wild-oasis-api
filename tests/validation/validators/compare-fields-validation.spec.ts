import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from '@/validation/validators'
import { faker } from '@faker-js/faker'

const field = faker.lorem.word()
const fieldToCompare = faker.lorem.word()

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFields Validation', () => {
  test('should return an InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: 'any_field',
      [fieldToCompare]: 'another_field'
    })
    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })
})
