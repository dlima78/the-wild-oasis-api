import { AccountMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'
import { type Collection } from 'mongodb'

let accountCollection: Collection

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('AccountMongoReporitory', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('add()', () => {
    test('should add account on success', async () => {
      const sut = makeSut()
      const addAccounts = mockAddAccountParams()
      const isValid = await sut.add(addAccounts)
      expect(isValid).toBe(true)
    })
  })

  describe('LoadByEmail()', () => {
    test('should return an account on success', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const account = await sut.loadByEmail(addAccountParams.email)
      if (account) {
        expect(account).toBeTruthy()
        expect(account.name).toBe(addAccountParams.name)
        expect(account.password).toBe(addAccountParams.password)
      }
    })
  })

  describe('checkByEmail()', () => {
    test('should return true if email is valid', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const exists = await sut.checkByEmail(addAccountParams.email)
      expect(exists).toBe(true)
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on success', async () => {
      const sut = makeSut()
      const res = await accountCollection.insertOne(mockAddAccountParams())
      const fakeAccount = await accountCollection.findOne({
        _id: res.insertedId
      })
      if (fakeAccount) {
        expect(fakeAccount.accessToken).toBeFalsy()
        const accessToken = faker.string.uuid()
        await sut.updateAccessToken(fakeAccount._id.toString(), accessToken)
        const account = await accountCollection.findOne({
          _id: fakeAccount._id
        })
        if (account) {
          expect(account).toBeTruthy()
          expect(account.accessToken).toBe(accessToken)
        }
      }
    })
  })
})
