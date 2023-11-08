import { type Validation } from '@/presentation/protocols'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'

export const makeAddBookingValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of [
    'startDate',
    'endDate',
    'numNight',
    'mumGuest',
    'cabinPrice',
    'extraPrice',
    'totalPrice',
    'status',
    'hasBreakfast',
    'isPaid',
    'observations',
    'cabinId',
    'userId'
  ]) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
