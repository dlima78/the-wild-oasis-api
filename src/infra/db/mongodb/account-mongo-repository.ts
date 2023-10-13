import {
  type CheckAccountByEmailRepository,
  type AddAccountRepository
} from '@/data/protocols'
import { MongoHelper } from '@/infra/db'

export class AccountMongoRepository
implements AddAccountRepository, CheckAccountByEmailRepository {
  async add (data: AddAccountRepository.Params): Promise<boolean> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(data)
    return result !== null
  }

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account !== null
  }
}
