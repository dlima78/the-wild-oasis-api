import { type DeleteCabin } from '@/domain/usecases'
import { type DeleteCabinRepository } from '@/data/protocols'

export class DbDeleteCabin implements DeleteCabin {
  constructor (private readonly deleteCabinRepository: DeleteCabinRepository) {}
  async delete (cabinId: DeleteCabin.Param): Promise<boolean> {
    return await this.deleteCabinRepository.delete(cabinId)
  }
}
