import { type AddCabin } from '@/domain/usecases'
import {
  type HttpResponse,
  type Controller,
  type Validation
} from '@/presentation/protocols'

export class AddCabinController implements Controller {
  constructor (
    private readonly addCabin: AddCabin,
    private readonly validation: Validation
  ) {}

  async handle (request: AddCabinController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    await this.addCabin.add(request)
    return {
      statusCode: 400,
      body: ''
    }
  }
}

export namespace AddCabinController {
  export type Request = {
    name: string
    maxCapacity: number
    regularPrice: number
    discount: number
    description: string
    image?: string
  }
}
