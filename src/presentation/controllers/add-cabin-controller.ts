import { type AddCabin } from '@/domain/usecases/add-cabin'
import { noContent } from '@/presentation/helpers'
import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'

export class AddCabinController implements Controller {
  constructor (private readonly addCabin: AddCabin, private readonly validation: Validation) {}
  async handle (request: AddCabinController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
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
