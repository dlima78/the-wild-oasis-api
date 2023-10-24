import { makeSaveCabinValidation } from '@/main/factories'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('SaveCabinValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSaveCabinValidation()
    const validations: Validation[] = []
    for (const field of [
      'name',
      'maxCapacity',
      'regularPrice',
      'discount',
      'description'
    ]) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
