import { type AddBooking } from '@/domain/usecases'

export class AddBookingSpy implements AddBooking {
  params!: AddBooking.Params

  result = true

  async add (params: AddBooking.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}
