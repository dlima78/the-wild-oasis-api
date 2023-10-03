import { type AddCabin } from '@/domain/usecases/add-cabin'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import {
  type Controller,
  type HttpResponse,
  type Validation
} from '@/presentation/protocols'

export class AddCabinController implements Controller {
  constructor (
    private readonly addCabin: AddCabin,
    private readonly validation: Validation
  ) {}

  async handle (request: AddCabinController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) {
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
    image?: string | undefined
  }
}
