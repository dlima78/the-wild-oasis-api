import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddGuestController, makeLoadGuestsController, makeLoadGuestController } from '@/main/factories'
import { adminAuth, auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/guest', adminAuth, adaptRoute(makeAddGuestController()))
  router.get('/guest/:guestId', auth, adaptRoute(makeLoadGuestController()))
  router.get('/guests', adminAuth, adaptRoute(makeLoadGuestsController()))
}
