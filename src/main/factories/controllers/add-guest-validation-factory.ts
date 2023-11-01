import { type Validation } from '@/presentation/protocols'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'

export const makeAddGuestValidation = (): ValidationComposite => {
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
  return new ValidationComposite(validations)
}
