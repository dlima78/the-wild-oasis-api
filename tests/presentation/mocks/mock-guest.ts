import { type AddGuest } from '@/domain/usecases'

export class AddGuestSpy implements AddGuest {
  params = {
    fullName: '',
    email: '',
    nationality: '',
    countryFlag: '',
    nationalId: ''
  }

  result = true

  async add (params: AddGuest.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}
