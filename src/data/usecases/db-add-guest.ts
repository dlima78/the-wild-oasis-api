import { type AddGuestRepository } from '@/data/protocols'
import { type AddGuest } from '@/domain/usecases'

export class DbAddGuest implements AddGuestRepository {
  constructor (
    private readonly addGuestRepository: AddGuestRepository
  ) {}

  async add (guestData: AddGuest.Params): Promise<boolean> {
    await this.addGuestRepository.add(guestData)
    return false
  }
}
