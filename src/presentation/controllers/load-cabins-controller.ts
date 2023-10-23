import { type LoadCabins } from '@/domain/usecases'
import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class LoadCabinsController implements Controller {
  constructor (private readonly loadCabins: LoadCabins) {}

  async handle (): Promise<HttpResponse> {
    await this.loadCabins.load()
    return {
      statusCode: 400,
      body: ''
    }
  }
}
