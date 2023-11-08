import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddBookingController } from '@/main/factories'
import { adminAuth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/booking', adminAuth, adaptRoute(makeAddBookingController()))
}
