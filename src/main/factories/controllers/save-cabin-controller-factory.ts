import { SaveCabinController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeSaveCabinValidation, makeDbSaveCabin } from '@/main/factories'
import { makeLogControllerDecorator } from '../decorators/log-controller-decorator-factory'

export const makeSaveCabinController = (): Controller => {
  const controller = new SaveCabinController(
    makeDbSaveCabin(),
    makeSaveCabinValidation()
  )
  return makeLogControllerDecorator(controller)
}
