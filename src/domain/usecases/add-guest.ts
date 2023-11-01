export interface AddGuest {
  add: (guestData: AddGuest.Params) => Promise<AddGuest.Result>
}

export namespace AddGuest {
  export type Params = {
    fullName: string
    email: string
    nationality: string
    countryFlag: string
    nationalId: string
  }

  export type Result = boolean
}
