import { type Validation } from '@/presentation/protocols'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'

export const makeAddCabinValidation = (): ValidationComposite => {
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
  return new ValidationComposite(validations)
}
