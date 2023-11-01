export interface BookingModel {
  id: string
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
