import { type HttpResponse, type Controller } from '@/presentation/protocols'
import { type LoadGuests } from '@/domain/usecases'
import { noContent, ok, serverError } from '@/presentation/helpers'

export class LoadGuestsController implements Controller {
  constructor (private readonly loadGuests: LoadGuests) {}

  async handle (): Promise<HttpResponse> {
    try {
      const guests = await this.loadGuests.load()
      if (guests.length === 0) {
        return noContent()
      }
      return ok(guests)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
