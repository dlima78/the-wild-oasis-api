import { type UpdateGuest, type AddGuest } from '@/domain/usecases'
import { mockGuestModel } from '@/tests/domain/mocks'
import { type UpdateGuestRepository, type LoadGuestByIdRepository, type LoadGuestsRepository } from '../protocols'
import { type GuestModel } from '@/domain/models'

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

export class LoadGuestsRepositorySpy implements LoadGuestsRepository {
  result = [mockGuestModel(), mockGuestModel()]
  async loadAll (): Promise<LoadGuestsRepository.Result> {
    return this.result
  }
}

export class LoadGuestByIdRepositorySpy implements LoadGuestByIdRepository {
  result = mockGuestModel()
  guestId = ''
  async loadById (cabinId: string): Promise<LoadGuestByIdRepository.Result> {
    this.guestId = cabinId
    return this.result
  }
}

export class UpdateGuestRepositorySpy implements UpdateGuestRepository {
  data: UpdateGuest.Params = {
    guestId: '',
    fullName: '',
    email: '',
    nationality: '',
    countryFlag: '',
    nationalId: ''
  }

  result = mockGuestModel()
  async update (data: UpdateGuest.Params): Promise<GuestModel> {
    this.data = data
    return this.result
  }
}
