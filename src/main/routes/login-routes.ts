import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeLoginController, makeSignupController } from '@/main/factories'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
