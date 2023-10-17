import { LoginController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import { makeAuthenticationFactory } from '../usecases'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(
    makeLoginValidation(),
    makeAuthenticationFactory()
  )
  return makeLogControllerDecorator(controller)
}
