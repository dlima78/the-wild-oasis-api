import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddGuestController, makeLoadGuestsController, makeLoadGuestController, makeUpdateGuestController, makeDeleteGuestController } from '@/main/factories'
import { adminAuth, auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/guest', adminAuth, adaptRoute(makeAddGuestController()))
  router.get('/guest/:guestId', auth, adaptRoute(makeLoadGuestController()))
  router.get('/guests', adminAuth, adaptRoute(makeLoadGuestsController()))
  router.patch('/guest/:guestId', adminAuth, adaptRoute(makeUpdateGuestController()))
  router.delete('/guest/:guestId', adminAuth, adaptRoute(makeDeleteGuestController()))
}
