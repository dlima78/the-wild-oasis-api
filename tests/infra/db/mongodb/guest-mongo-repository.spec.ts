import { GuestMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddGuestParams } from '@/tests/domain/mocks'
import { type Collection } from 'mongodb'

const makeSut = (): GuestMongoRepository => {
  return new GuestMongoRepository()
}

let guestCollection: Collection

describe('GuestMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    guestCollection = MongoHelper.getCollection('guests')
    await guestCollection.deleteMany({})
  })

  describe('add()', () => {
    test('should add cabin on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddGuestParams())
      const count = await guestCollection.countDocuments()
      expect(count).toBe(1)
    })
  })
})
