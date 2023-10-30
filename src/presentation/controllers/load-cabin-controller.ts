import { type LoadCabin } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'

export class LoadCabinController implements Controller {
  constructor (private readonly loadCabin: LoadCabin) {}

  async handle (request: LoadCabinController.Request): Promise<HttpResponse> {
    try {
      const { cabinId } = request
      const cabinModel = await this.loadCabin.loadById(cabinId)
      return ok(cabinModel)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace LoadCabinController {
  export type Request = {
    cabinId: string
  }
}
