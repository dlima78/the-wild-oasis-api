import { type UpdateGuestRepository } from '@/data/protocols'
import { type GuestModel } from '@/domain/models'
import { type UpdateGuest } from '@/domain/usecases'

export class DbUpdateGuest implements UpdateGuest {
  constructor (
    private readonly updateGuestRepository: UpdateGuestRepository
  ) {}

  async update (params: UpdateGuest.Params): Promise<GuestModel> {
    return await this.updateGuestRepository.update(params)
  }
}
