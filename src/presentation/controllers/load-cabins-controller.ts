import { type LoadCabins } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helpers'

export class LoadCabinsController implements Controller {
  constructor (private readonly loadCabins: LoadCabins) {}

  async handle (): Promise<HttpResponse> {
    try {
      const cabins = await this.loadCabins.load()
      if (cabins.length === 0) {
        return noContent()
      }
      return ok(cabins)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
