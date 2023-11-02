import { type GuestModel } from '@/domain/models'
import { type LoadGuests, type AddGuest, type LoadGuest } from '@/domain/usecases'
import { mockGuestModel } from '@/tests/domain/mocks'

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

export class LoadGuestsSpy implements LoadGuests {
  result: GuestModel[] = [mockGuestModel(), mockGuestModel()]
  async load (): Promise<LoadGuests.Result> {
    return this.result
  }
}

export class LoadGuestSpy implements LoadGuest {
  result = mockGuestModel()
  cabinId = ''
  async load (cabinId: string): Promise<LoadGuest.Result> {
    this.cabinId = cabinId
    return this.result
  }
}
