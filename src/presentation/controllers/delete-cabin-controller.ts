import { type DeleteCabin } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { forbidden, noContent } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

export class DeleteCabinController implements Controller {
  constructor (private readonly deleteCabin: DeleteCabin) {}

  async handle (request: DeleteCabinController.Request): Promise<HttpResponse> {
    const isValid = await this.deleteCabin.delete(request.cabinId)
    if (!isValid) {
      return forbidden(new InvalidParamError('cabinId'))
    }
    return noContent()
  }
}

export namespace DeleteCabinController {
  export type Request = {
    cabinId: string
  }
}
