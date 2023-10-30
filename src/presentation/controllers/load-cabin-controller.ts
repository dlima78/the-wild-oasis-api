import { type LoadCabin } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class LoadCabinController implements Controller {
  constructor (private readonly loadCabin: LoadCabin) {}

  async handle (request: LoadCabinController.Request): Promise<HttpResponse> {
    await this.loadCabin.loadById(request.id)
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
