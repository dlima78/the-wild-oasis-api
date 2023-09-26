import { type AddCabin } from '@/domain/usecases/add-cabin'
import { noContent } from '@/presentation/helpers'
import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class AddCabinController implements Controller {
  constructor (private readonly addCabin: AddCabin) {}
  async handle (request: AddCabinController.Request): Promise<HttpResponse> {
    await this.addCabin.add(request)
    return noContent()
  }
}

export namespace AddCabinController {
  export type Request = {
    name: string
    maxCapacity: number
    regularPrice: number
    discount: number
    description: string
    image?: string | undefined
  }
}
