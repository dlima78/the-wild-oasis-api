import { type LoadGuests } from '@/domain/usecases'
import { type LoadGuestsRepository } from '@/data/protocols'

export class DbLoadGuests implements LoadGuests {
  constructor (private readonly loadGuestsRepository: LoadGuestsRepository) {}
  async load (): Promise<LoadGuests.Result> {
    return await this.loadGuestsRepository.loadAll()
  }
}
