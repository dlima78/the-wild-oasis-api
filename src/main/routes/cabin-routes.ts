import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import {
  makeUpdateCabinController,
  makeLoadCabinsController,
  makeAddCabinController,
  makeLoadCabinController
} from '@/main/factories'
import { adminAuth, auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.get('/cabin/:cabinId', auth, adaptRoute(makeLoadCabinController()))
  router.post('/cabin', adminAuth, adaptRoute(makeAddCabinController()))
  router.patch('/cabin/:cabinId', adminAuth, adaptRoute(makeUpdateCabinController())
  )
  router.get('/cabins', auth, adaptRoute(makeLoadCabinsController()))
}
