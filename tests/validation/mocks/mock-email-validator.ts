import { type EmailValidator } from '../protocols/email-validator'

export class EmailValidatorSpy implements EmailValidator {
  email = ''
  isEmailValid = true
  isValid (email: string): boolean {
    this.email = email
    return this.isEmailValid
  }
}
