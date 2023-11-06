export interface AddBooking {
  add: (params: AddBooking.Params) => Promise<AddBooking.Result>
}

export namespace AddBooking {
  export type Params = {
    startDate: Date
    endDate: Date
    numNight: number
    mumGuest: number
    cabinPrice: number
    extraPrice: number
    totalPrice: number
    status: string
    hasBreakfast: boolean
    isPaid: boolean
    observations: string
    cabinId: string
    userId: string
  }

  export type Result = boolean
}
