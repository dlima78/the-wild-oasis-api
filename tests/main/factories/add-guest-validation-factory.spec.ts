import { makeAddGuestValidation } from '@/main/factories'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('AddGuestValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddGuestValidation()
    const validations: Validation[] = []
    for (const field of [
      'fullName',
      'email',
      'nationality',
      'countryFlag',
      'nationalId'
    ]) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
