import { type LoadBookingByIdRepository, type AddBookingRepository } from '@/data/protocols'
import { type BookingModel } from '@/domain/models'
import { mockBookingModel } from '@/tests/domain/mocks'

export class AddBookingRepositorySpy implements AddBookingRepository {
  data!: AddBookingRepository.Params
  result = true
  async add (data: AddBookingRepository.Params): Promise<boolean> {
    this.data = data
    return this.result
  }
}

export class LoadBookingByIdRepositorySpy implements LoadBookingByIdRepository {
  id = ''
  result = mockBookingModel()
  async loadById (id: string): Promise<BookingModel> {
    this.id = id
    return this.result
  }
}
