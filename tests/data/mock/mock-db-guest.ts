import { type AddGuest } from '@/domain/usecases'

export class AddGuestRepositorySpy implements AddGuest {
  guestData: AddGuest.Params = {
    fullName: '',
    email: '',
    nationality: '',
    countryFlag: '',
    nationalId: ''
  }

  result = true
  async add (guestData: AddGuest.Params): Promise<boolean> {
    this.guestData = guestData
    return this.result
  }
}
