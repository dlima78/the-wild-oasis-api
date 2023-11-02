import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddGuestController, makeLoadGuestsController } from '@/main/factories'
import { adminAuth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/guest', adminAuth, adaptRoute(makeAddGuestController()))
  router.get('/guests', adminAuth, adaptRoute(makeLoadGuestsController()))
}
