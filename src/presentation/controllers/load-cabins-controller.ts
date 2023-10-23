import { type LoadCabins } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { ok } from '@/presentation/helpers'

export class LoadCabinsController implements Controller {
  constructor (private readonly loadCabins: LoadCabins) {}

  async handle (): Promise<HttpResponse> {
    const cabins = await this.loadCabins.load()
    return ok(cabins)
  }
}
