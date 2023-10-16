import {
  type CheckAccountByEmailRepository,
  type AddAccountRepository,
  type UpdateAccessTokenRepository,
  type LoadAccoutByEmailRepository
} from '@/data/protocols'
import { MongoHelper } from '@/infra/db'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository
implements
    AddAccountRepository,
    CheckAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccoutByEmailRepository {
  async add (data: AddAccountRepository.Params): Promise<boolean> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(data)
    return result !== null
  }

  async loadByEmail (
    email: string
  ): Promise<LoadAccoutByEmailRepository.Result> {
    const accountCollection = MongoHelper.getCollection('account')
    const account = await accountCollection.findOne(
      { email },
      {
        projection: {
          _id: 1,
          name: 1,
          password: 1
        }
      }
    )
    return account && MongoHelper.map(account)
  }

  async checkByEmail (
    email: string
  ): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account !== null
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          accessToken: token
        }
      }
    )
  }
}
