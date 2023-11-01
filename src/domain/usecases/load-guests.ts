import { type GuestModel } from '../models/guest'

export interface LoadGuests {
  load: () => Promise<LoadGuests.Result>
}

export namespace LoadGuests {
  export type Result = GuestModel[]
}
