import { type DeleteCabin } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { forbidden } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'

export class DeleteCabinController implements Controller {
  constructor (private readonly deleteCabin: DeleteCabin) {}

  async handle (request: DeleteCabinController.Request): Promise<HttpResponse> {
    await this.deleteCabin.delete(request.cabinId)

    return forbidden(new InvalidParamError('cabinId'))
  }
}

export namespace DeleteCabinController {
  export type Request = {
    cabinId: string
  }
}
