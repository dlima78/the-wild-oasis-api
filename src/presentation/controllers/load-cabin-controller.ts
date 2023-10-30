import { type LoadCabin } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers'

export class LoadCabinController implements Controller {
  constructor (private readonly loadCabin: LoadCabin) {}

  async handle (request: LoadCabinController.Request): Promise<HttpResponse> {
    const cabinModel = await this.loadCabin.loadById(request.id)
    if (cabinModel) {
      return ok(cabinModel)
    }
    return {
      statusCode: 0,
      body: ''
    }
  }
}

export namespace LoadCabinController {
  export type Request = {
    id: string
  }
}
