import { type DeleteCabin } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { forbidden, noContent, serverError } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

export class DeleteCabinController implements Controller {
  constructor (private readonly deleteCabin: DeleteCabin) {}

  async handle (request: DeleteCabinController.Request): Promise<HttpResponse> {
    try {
      const isValid = await this.deleteCabin.delete(request.cabinId)
      if (!isValid) {
        return forbidden(new InvalidParamError('cabinId'))
      }
      return noContent()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace DeleteCabinController {
  export type Request = {
    cabinId: string
  }
}
