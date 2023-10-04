import { type Router } from 'express'
import { adaptRoute } from '@/main/adapter'
import { makeAddCabinController } from '@/main/factories'

export default (router: Router): void => {
  router.post('/cabin', adaptRoute(makeAddCabinController()))
}
