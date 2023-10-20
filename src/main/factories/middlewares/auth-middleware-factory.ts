import { AuthMiddleware } from '@/presentation/middlewares'
import { makeDbLoadAccountByToken } from '@/main/factories/usecases'

export const makeAuthMiddleware = (role?: string): AuthMiddleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
