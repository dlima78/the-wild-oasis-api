export interface DeleteGuest {
  delete: (guestId: string) => Promise<boolean>
}
