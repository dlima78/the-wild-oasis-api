import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import {
  makeUpdateCabinController,
  makeLoadCabinsController,
  makeAddCabinController,
  makeLoadCabinController,
  makeDeleteCabinController
} from '@/main/factories'
import { adminAuth, auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.get('/cabin/:cabinId', auth, adaptRoute(makeLoadCabinController()))
  router.get('/cabins', auth, adaptRoute(makeLoadCabinsController()))
  router.post('/cabin', adminAuth, adaptRoute(makeAddCabinController()))
  router.patch('/cabin/:cabinId', adminAuth, adaptRoute(makeUpdateCabinController())
  )
  router.delete('/cabin/:cabinId', adminAuth, adaptRoute(makeDeleteCabinController()))
}
