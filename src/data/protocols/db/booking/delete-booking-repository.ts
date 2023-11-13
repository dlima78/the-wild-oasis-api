export interface DeleteBookingRepository {
  delete: (bookingId: string) => Promise<boolean>
}
