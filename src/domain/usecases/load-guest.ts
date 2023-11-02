import { type GuestModel } from '../models/guest'

export interface LoadGuest {
  load: (guestId: string) => Promise<LoadGuest.Result>
}

export namespace LoadGuest {
  export type Result = GuestModel
}
