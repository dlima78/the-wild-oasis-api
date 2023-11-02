import { type LoadGuest } from '@/domain/usecases'
import { type LoadGuestByIdRepository } from '@/data/protocols'

export class DbLoadGuest implements LoadGuest {
  constructor (private readonly loadGuestByIdRepository: LoadGuestByIdRepository) {}
  async load (guestId: string): Promise<LoadGuest.Result> {
    return await this.loadGuestByIdRepository.loadById(guestId)
  }
}
