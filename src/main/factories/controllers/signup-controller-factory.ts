import { SignupController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'
import {
  makeAuthenticationFactory,
  makeDbAddAccount,
  makeSignupValidation
} from '@/main/factories'

export const makeSignupController = (): Controller => {
  const controller = new SignupController(
    makeDbAddAccount(),
    makeSignupValidation(),
    makeAuthenticationFactory()
  )
  return makeLogControllerDecorator(controller)
}
