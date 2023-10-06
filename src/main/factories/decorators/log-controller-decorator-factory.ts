import { LogMongoRepository } from '@/infra/db'
import { LogControllerDecorator } from '@/main/decorator'
import { type Controller } from '@/presentation/protocols'

export const makeLogControllerDecorator = (
  controller: Controller
): Controller => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
