import { type AddCabin } from '@/domain/usecases'
import {
  type HttpResponse,
  type Controller,
  type Validation
} from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers'

export class AddCabinController implements Controller {
  constructor (
    private readonly addCabin: AddCabin,
    private readonly validation: Validation
  ) {}

  async handle (request: AddCabinController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.addCabin.add(request)
      return noContent()
    } catch (error) {
      return serverError(error as Error)
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
