import { type AddCabin } from '@/domain/usecases/add-cabin'

export class AddCabinController {
  constructor (private readonly addCabin: AddCabin) {}
  async handle (request: any): Promise<any> {
    await this.addCabin.add(request)
    return {}
  }
}
