import { type HttpResponse, type Controller } from '@/presentation/protocols'
import { type LoadGuests } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'

export class LoadGuestController implements Controller {
  constructor (private readonly loadGuests: LoadGuests) {}

  async handle (): Promise<HttpResponse> {
    const guests = await this.loadGuests.load()
    return ok(guests)
  }
}
