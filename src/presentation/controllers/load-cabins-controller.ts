import { type LoadCabins } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { noContent, ok } from '@/presentation/helpers'

export class LoadCabinsController implements Controller {
  constructor (private readonly loadCabins: LoadCabins) {}

  async handle (): Promise<HttpResponse> {
    const cabins = await this.loadCabins.load()
    if (cabins.length === 0) {
      return noContent()
    }
    return ok(cabins)
  }
}
