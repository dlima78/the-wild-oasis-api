export interface DeleteGuestRepository {
  delete: (guestId: string) => Promise<boolean>
}
