import { DbAddAccount } from '@/data/usecases'
import { AccountMongoRepository } from '@/infra/db'
import { type AddAccount } from '@/domain/usecases'
import { BcryptAdapter } from '@/infra/cryptography'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(
    bcryptAdapter,
    accountMongoRepository,
    accountMongoRepository
  )
}
