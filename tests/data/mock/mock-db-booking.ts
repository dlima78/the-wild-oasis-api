import { type AddBookingRepository } from '@/data/protocols'

export class AddBookingRepositorySpy implements AddBookingRepository {
  data!: AddBookingRepository.Params
  result = true
  async add (data: AddBookingRepository.Params): Promise<boolean> {
    this.data = data
    return this.result
  }
}
