export interface DeleteBooking {
  delete: (bookingId: string) => Promise<boolean>
}
