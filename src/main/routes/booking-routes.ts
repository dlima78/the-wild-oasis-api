import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddBookingController, makeLoadBookingController, makeLoadBookingsController } from '@/main/factories'
import { adminAuth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/booking', adminAuth, adaptRoute(makeAddBookingController()))
  router.get('/booking/:bookingId', adminAuth, adaptRoute(makeLoadBookingController()))
  router.get('/bookings', adminAuth, adaptRoute(makeLoadBookingsController()))
}
