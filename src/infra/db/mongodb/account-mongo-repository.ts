import { type AddAccountRepository } from '@/data/protocols'
import { MongoHelper } from '@/infra/db'

export class AccountMongoRepository implements AddAccountRepository {
  async add (data: AddAccountRepository.Params): Promise<boolean> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(data)
    return result !== null
  }
}
