import { type UpdateCabin } from '@/domain/usecases'
import { type UpdateCabinRepository } from '@/data/protocols'

export class DbUpdateCabin implements UpdateCabin {
  constructor (private readonly updateCabinRepository: UpdateCabinRepository) {}
  async update (data: UpdateCabin.Params): Promise<UpdateCabin.Result> {
    return await this.updateCabinRepository.update(data)
  }
}
