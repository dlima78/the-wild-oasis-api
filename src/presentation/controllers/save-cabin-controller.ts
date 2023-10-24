import { type SaveCabin } from '@/domain/usecases/save-cabin'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import {
  type Controller,
  type HttpResponse,
  type Validation
} from '@/presentation/protocols'

export class SaveCabinController implements Controller {
  constructor (
    private readonly saveCabin: SaveCabin,
    private readonly validation: Validation
  ) {}

  async handle (request: SaveCabinController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error != null) {
        return badRequest(error)
      }
      await this.saveCabin.save(request)

      return noContent()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace SaveCabinController {
  export type Request = {
    name: string
    maxCapacity: number
    regularPrice: number
    discount: number
    description: string
    image?: string | undefined
  }
}
