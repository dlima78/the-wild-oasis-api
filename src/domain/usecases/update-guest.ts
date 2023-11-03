import { type GuestModel } from '../models/guest'

export interface UpdateGuest {
  update: (params: UpdateGuest.Params) => Promise<UpdateGuest.Result>
}

export namespace UpdateGuest {
  export type Params = {
    guestId: string
    fullName: string
    email: string
    nationality: string
    countryFlag: string
    nationalId: string
  }
  export type Result = GuestModel
}
