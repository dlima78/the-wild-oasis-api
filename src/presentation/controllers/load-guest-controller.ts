import { type HttpResponse, type Controller } from '@/presentation/protocols'
import { type LoadGuest } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'

export class LoadGuestController implements Controller {
  constructor (private readonly loadGuest: LoadGuest) {}

  async handle (request: LoadGuestController.Request): Promise<HttpResponse> {
    const guest = await this.loadGuest.load(request.cabinId)
    return ok(guest)
  }
}

export namespace LoadGuestController {
  export type Request = {
    cabinId: string
  }
}
