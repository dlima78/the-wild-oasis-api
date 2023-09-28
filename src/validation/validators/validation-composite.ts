import { type Validation } from '@/presentation/protocols'

export class ValidationComposite implements Validation {
  constructor (private readonly validation: Validation[]) {}
  validate (input: any): Error | null {
    for (const validation of this.validation) {
      const error = validation.validate(input)
      if (error != null) {
        return error
      }
    }
    return null
  }
}
