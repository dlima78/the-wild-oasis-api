import { type UpdateCabin } from '@/domain/usecases/update-cabin'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { serverError, ok } from '@/presentation/helpers'

export class UpdateCabinController implements Controller {
  constructor (private readonly updateCabin: UpdateCabin) {}

  async handle (request: UpdateCabinController.Request): Promise<HttpResponse> {
    try {
      const cabinResult = await this.updateCabin.update(request)
      return ok(cabinResult)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace UpdateCabinController {
  export type Request = {
    cabinId: string
    name: string
    maxCapacity: number
    regularPrice: number
    discount: number
    description: string
    image?: string | undefined
  }
}
