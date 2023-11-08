import { makeAddBookingValidation } from '@/main/factories'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'
import { type Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('AddBookingValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddBookingValidation()
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
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
