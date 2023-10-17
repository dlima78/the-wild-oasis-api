import { DbAuthentication } from '@/data/usecases'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db'
import env from '@/main/config/env'

export const makeAuthenticationFactory = (): DbAuthentication => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const hashComparer = new BcryptAdapter(salt)
  return new DbAuthentication(
    accountMongoRepository,
    jwtAdapter,
    accountMongoRepository,
    hashComparer
  )
}
