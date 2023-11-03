import { type DeleteGuest } from '@/domain/usecases'
import { type DeleteGuestRepository } from '@/data/protocols'

export class DbDeleteGuest implements DeleteGuest {
  constructor (private readonly deleteGuestRepository: DeleteGuestRepository) {}
  async delete (guestId: string): Promise<boolean> {
    return await this.deleteGuestRepository.delete(guestId)
  }
}
