import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeAddCabinController } from '@/main/factories'
import { adminAuth } from '@/main/middlewares/admin-auth'

export default (router: Router): void => {
  router.post('/cabin', adminAuth, adaptRoute(makeAddCabinController()))
}
