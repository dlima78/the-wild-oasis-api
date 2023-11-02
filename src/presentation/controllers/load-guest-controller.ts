import { type HttpResponse, type Controller } from '@/presentation/protocols'
import { type LoadGuest } from '@/domain/usecases'

export class LoadGuestController implements Controller {
  constructor (private readonly loadGuest: LoadGuest) {}

  async handle (request: LoadGuestController.Request): Promise<HttpResponse> {
    await this.loadGuest.load(request.cabinId)
    return {
      statusCode: 0,
      body: ''
    }
  }
}

export namespace LoadGuestController {
  export type Request = {
    cabinId: string
  }
}
