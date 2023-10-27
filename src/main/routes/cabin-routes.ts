import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import {
  makeSaveCabinController,
  makeLoadCabinsController,
  makeAddCabinController
} from '@/main/factories'
import { adminAuth, auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/cabin', adminAuth, adaptRoute(makeAddCabinController()))
  router.put(
    '/cabin/:cabinId',
    adminAuth,
    adaptRoute(makeSaveCabinController())
  )
  router.get('/cabins', auth, adaptRoute(makeLoadCabinsController()))
}
