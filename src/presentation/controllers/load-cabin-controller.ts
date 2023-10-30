import { type LoadCabin } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helpers'

export class LoadCabinController implements Controller {
  constructor (private readonly loadCabin: LoadCabin) {}

  async handle (request: LoadCabinController.Request): Promise<HttpResponse> {
    try {
      const cabinModel = await this.loadCabin.loadById(request.id)
      if (cabinModel) {
        return ok(cabinModel)
      }
      return noContent()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace LoadCabinController {
  export type Request = {
    id: string
  }
}
