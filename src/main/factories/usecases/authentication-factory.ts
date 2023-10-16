import { DbAuthentication } from '@/data/usecases'
import { JwtAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db'
import env from '@/main/config/env'

export const makeAuthenticationFactory = (): DbAuthentication => {
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(
    accountMongoRepository,
    jwtAdapter,
    accountMongoRepository
  )
}
